import type { Handler } from 'hono';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken } from '#server/utils/auth/common.ts';

export const fodselsNrHandler: Handler = (c) => {
	const token = getAuthToken(c.req.header('authorization'));

	if (!token) {
		return c.body(null, 401);
	}

	return c.json({ fodselsnr: jwtDecode<{ pid: string }>(token).pid });
};
