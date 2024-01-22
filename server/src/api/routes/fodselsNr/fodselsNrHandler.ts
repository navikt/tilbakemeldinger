import { RequestHandler } from 'express';
import decodeJWT from 'jwt-decode';
import { getAuthToken } from '../../../utils/auth/common';

export const fodselsNrHandler: RequestHandler = (req, res) => {
    const token = getAuthToken(req);

    if (!token) {
        return res.status(401).send();
    }
    return res.send({ fodselsnr: decodeJWT(token).pid });
    return res.send({ fodselsnr: decodeJWT<{ pid: string }>(token).pid });
};
