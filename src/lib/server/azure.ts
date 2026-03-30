import { BlobServiceClient } from '@azure/storage-blob';
import { AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_CONTAINER } from '$env/static/private';

function getContainerClient() {
	const client = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
	return client.getContainerClient(AZURE_STORAGE_CONTAINER);
}

/**
 * Upload a file buffer to Azure Blob Storage.
 * @returns The full public URL of the uploaded blob.
 */
export async function uploadBlob(
	filename: string,
	data: Buffer,
	contentType: string
): Promise<string> {
	const container = getContainerClient();
	const blockBlob = container.getBlockBlobClient(filename);
	await blockBlob.uploadData(data, {
		blobHTTPHeaders: { blobContentType: contentType }
	});
	return blockBlob.url;
}

/**
 * Delete a blob by its full URL.
 * Silently ignores blobs that no longer exist.
 */
export async function deleteBlob(url: string): Promise<void> {
	try {
		const container = getContainerClient();
		// Extract the blob name as everything after the container path
		const containerUrl = container.url;
		const blobName = url.replace(containerUrl + '/', '');
		if (!blobName || blobName === url) return;
		const blockBlob = container.getBlockBlobClient(blobName);
		await blockBlob.deleteIfExists();
	} catch {
		// Silently ignore errors (blob may already be gone)
	}
}
