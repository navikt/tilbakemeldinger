import { RequestHandler } from 'express';
import { jwtDecode } from 'jwt-decode';
import { getAuthToken } from '../../../utils/auth/common';

export const fodselsNrHandler: RequestHandler = (req, res) => {
    const token = getAuthToken(req);

    if (!token) {
        return res.status(401).send();
    }

    return res.send({ fodselsnr: jwtDecode<{ pid: string }>(token).pid });
};
