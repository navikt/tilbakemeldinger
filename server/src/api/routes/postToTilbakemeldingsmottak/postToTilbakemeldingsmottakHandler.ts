import { RequestHandler } from 'express';
import { getAccessToken } from '../../../utils/auth/common';

export const postToTilbakemeldingsmottakHandler: RequestHandler = async (
    req,
    res
) => {
    const path = req.params.path;
    console.log(`POST /mottak/${path}`);
    console.log('API_URL', process.env.API_URL);

    const accessToken = await getAccessToken(req);

    if (!accessToken) {
        return res.status(500).send('Failed to populate auth header');
    }

    const response = await fetch(`${process.env.API_URL}/rest/ros}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(req.body),
    });

    if (!response.ok) {
        const error = await response.json();
        const errorString = await response.text();
        console.log(
            `Feil i kall til tilbakemeldingsmottak-api: ${errorString}`
        );
        return res.status(response.status).send(error);
    }

    const responseData = await response.json();
    res.status(response.status).send(responseData);
};
