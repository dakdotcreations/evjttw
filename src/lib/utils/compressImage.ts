const MAX_BYTES = 400_000; // 400 KB

/**
 * Compresses an image file to under 400 KB using Canvas.
 * First tries reducing JPEG quality, then reduces dimensions if needed.
 * Returns the original file if already under the limit.
 */
export async function compressImage(file: File, maxBytes = MAX_BYTES): Promise<File> {
	if (file.size <= maxBytes) return file;

	return new Promise((resolve) => {
		const img = new Image();
		const objectUrl = URL.createObjectURL(file);

		img.onload = () => {
			URL.revokeObjectURL(objectUrl);

			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d')!;
			const outputName = file.name.replace(/\.[^.]+$/, '.jpg');

			const attempt = (width: number, height: number, quality: number) => {
				canvas.width = width;
				canvas.height = height;
				ctx.clearRect(0, 0, width, height);
				ctx.drawImage(img, 0, 0, width, height);

				canvas.toBlob(
					(blob) => {
						if (!blob) {
							resolve(file);
							return;
						}

						if (blob.size <= maxBytes) {
							resolve(new File([blob], outputName, { type: 'image/jpeg' }));
							return;
						}

						if (quality > 0.2) {
							// Try reducing quality first
							attempt(width, height, Math.round((quality - 0.1) * 10) / 10);
						} else if (width > 800) {
							// Then scale dimensions down proportionally
							const scale = Math.sqrt(maxBytes / blob.size) * 0.9;
							attempt(Math.floor(width * scale), Math.floor(height * scale), 0.75);
						} else {
							// Best we can do — return what we have
							resolve(new File([blob], outputName, { type: 'image/jpeg' }));
						}
					},
					'image/jpeg',
					quality
				);
			};

			attempt(img.naturalWidth, img.naturalHeight, 0.85);
		};

		img.onerror = () => {
			URL.revokeObjectURL(objectUrl);
			resolve(file);
		};

		img.src = objectUrl;
	});
}
