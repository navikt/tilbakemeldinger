import { RequestHandler } from 'express';
import decodeJWT from 'jwt-decode';
import { getAuthToken } from '../../../utils/auth/common';

export const fodselsNrHandler: RequestHandler = (req, res) => {
    const token = getAuthToken(req);

    if (!token) {
        return res.status(401).send();
    }

    // @ts-ignore
    return res.send({ fodselsnr: decodeJWT(token).pid });
};
