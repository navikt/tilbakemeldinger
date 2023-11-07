import { RequestHandler } from 'express';
import decodeJWT from 'jwt-decode';
import { getAuthToken } from '../../../utils/auth/common';

export const fodselsNrHandler: RequestHandler = (req, res) => {
    const token = getAuthToken(req)

    // @ts-ignore
    return res.send({ fodselsnr: decodeJWT(token).pid })
};
