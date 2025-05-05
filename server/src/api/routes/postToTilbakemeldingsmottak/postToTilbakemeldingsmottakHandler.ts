import { RequestHandler } from 'express';
import { getAccessToken } from '../../../utils/auth/common';
import { sanitize } from '../../../../../common/sanitize';

export const postToTilbakemeldingsmottakHandler: RequestHandler = async (
    req,
    res
) => {
    const path = req.params.path;
    const accessToken = await getAccessToken(req);
    const bodyCopy = JSON.parse(JSON.stringify(req.body));
    const body = sanitize(bodyCopy);

    if (!accessToken) {
        return res.status(500).send('Failed to populate auth header');
    }

    try {
        const response = await fetch(`${process.env.API_URL}/rest/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
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
    } catch (error) {
        console.error(`Feil i postToTilbakemeldingsmottakHandler: ${error}`);
        res.status(500).send('Internal server error');
    }
};
