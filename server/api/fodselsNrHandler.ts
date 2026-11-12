import type { Handler } from 'hono';
import { decodeJwt } from 'jose';
import { getAuthToken } from '#server/utils/auth/common.ts';

export const fodselsNrHandler: Handler = (c) => {
	const token = getAuthToken(c.req.header('authorization'));

	if (!token) {
		return c.body(null, { status: 401 });
	}

	return c.json({ fodselsnr: decodeJwt<{ pid: string }>(token).pid });
};
