import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { uploadBlob } from '$lib/server/azure';

const MAX_SIZE = 409_600; // 400 KB

export const POST: RequestHandler = async (event) => {
	if (!event.locals.user) {
		error(401, 'Unauthorized');
	}

	const formData = await event.request.formData();
	const file = formData.get('file');

	if (!(file instanceof File)) {
		error(400, 'No file provided');
	}

	if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
		error(400, 'Only image and video files are allowed');
	}

	if (file.size > MAX_SIZE) {
		error(413, 'File must be smaller than 400 KB');
	}

	const buffer = Buffer.from(await file.arrayBuffer());
	const ext = file.name.split('.').pop() ?? '';
	const filename = `${crypto.randomUUID()}-${Date.now()}${ext ? '.' + ext : ''}`;

	const url = await uploadBlob(filename, buffer, file.type);

	return json({ url });
};
