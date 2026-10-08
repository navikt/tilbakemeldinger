import type { RequestHandler } from 'express';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken } from '#server/utils/auth/common.ts';

export const fodselsNrHandler: RequestHandler = (req, res) => {
	const token = getAuthToken(req.headers.authorization);

	if (!token) {
		return res.status(401).send();
	}

	return res.send({ fodselsnr: jwtDecode<{ pid: string }>(token).pid });
};
