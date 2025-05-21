import { RequestHandler } from 'express';
import { getAccessToken } from '../../../utils/auth/common';
import { serviceKlageSchema } from '../../../../../common/schema/ServiceKlage';
import { feilOgManglerSchema } from '../../../../../common/schema/FeilOgMangler';
import { rosTilNavSchema } from '../../../../../common/schema/RosTilNav';

const deriveSchemaFromPath = (path: string) => {
    switch (path) {
        case 'ros':
            return rosTilNavSchema;
        case 'serviceklage':
            return serviceKlageSchema;
        case 'feil-og-mangler':
            return feilOgManglerSchema;
        default:
            throw new Error(`Unknown path: ${path}`);
    }
};

export const postToTilbakemeldingsmottakHandler: RequestHandler = async (
    req,
    res
) => {
    const path = req.params.path;
    const accessToken = await getAccessToken(req);
    const body = req.body;

    if (!accessToken) {
        return res.status(500).send('Failed to populate auth header');
    }

    const schema = deriveSchemaFromPath(path);

    const validationResult = schema.safeParse(body);
    if (!validationResult.success) {
        return res.status(400).send('Feil i validering av skjema');
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

            // Log error because validation should have been done both frontend and further up,
            // so something is wrong at this point
            console.error(
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
