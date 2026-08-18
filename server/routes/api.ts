import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { decodeJwt } from 'jose';
import { getAccessToken, getAuthToken } from '../auth/common.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { URLs } from '../utils/urls.js';
import { Enhet } from '../../common/enhet.js';
import { serviceKlageSchema } from '../../common/schema/ServiceKlage.js';
import { feilOgManglerSchema } from '../../common/schema/FeilOgMangler.js';
import { rosTilNavSchema } from '../../common/schema/RosTilNav.js';

const NORG2_API_URL = `${URLs.norg2Origin}${URLs.norg2Path}`;

// One table replaces the previous path check, switch statement and inline
// ternary, which each encoded the same three-way mapping separately.
const MOTTAK_ROUTES = {
    ros: { schema: rosTilNavSchema, apiPath: '/rest/ros' },
    serviceklage: {
        schema: serviceKlageSchema,
        apiPath: '/rest/v2/serviceklage',
    },
    'feil-og-mangler': {
        schema: feilOgManglerSchema,
        apiPath: '/rest/feil-og-mangler',
    },
} as const;

const transformEnhet = (enhetRaw: Record<string, unknown> & Enhet): Enhet => ({
    enhetNr: enhetRaw.enhetNr,
    status: enhetRaw.status,
    navn: enhetRaw.navn,
    type: enhetRaw.type,
});

export const apiRoutes = new Hono()
    .get('/internal/isAlive', (c) => c.json({ message: 'I am alive!' }))
    .get('/internal/isReady', (c) => c.json({ message: 'I am ready!' }))

    .get('/fodselsnr', (c) => {
        const token = getAuthToken(c.req.header('authorization'));

        if (!token) {
            return c.body(null, 401);
        }

        // Not verified here by design: the idporten sidecar validates the token
        // before it reaches us.
        const { pid } = decodeJwt<{ pid: string }>(token);
        return c.json({ fodselsnr: pid });
    })

    .get('/enheter', async (c) => {
        const enheter = await fetch(NORG2_API_URL)
            .then((norgRes) => norgRes.json())
            .catch((e) => {
                console.error(`Error fetching enheter from norg2 - ${e}`);
                return null;
            });

        if (!enheter || !Array.isArray(enheter)) {
            return c.text('Lasting av enheter feilet', 500);
        }

        return c.json(enheter.map(transformEnhet));
    })

    .post(
        '/mottak/:path',
        bodyLimit({ maxSize: 100 * 1024 }),
        rateLimit({
            windowMs: 30 * 60 * 1000,
            max: 100,
            message: 'Rate limit',
        }),
        rateLimit({
            windowMs: 2 * 60 * 1000,
            max: 5,
            message: 'Rate limit IP',
        }),
        async (c) => {
            const path = c.req.param('path');
            const route = MOTTAK_ROUTES[path as keyof typeof MOTTAK_ROUTES];

            if (!route) {
                return c.text('Path not found', 404);
            }

            const body = await c.req.json().catch(() => undefined);
            if (!route.schema.safeParse(body).success) {
                return c.text('Feil i validering av skjema', 400);
            }

            const accessToken = await getAccessToken({
                authHeader: c.req.header('authorization'),
                path,
            });
            if (!accessToken) {
                return c.text('Failed to populate auth header', 500);
            }

            try {
                const response = await fetch(
                    `${process.env.API_URL}${route.apiPath}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        body: JSON.stringify(body),
                    }
                );

                if (!response.ok) {
                    const errorText = await response.text();

                    // Validation happens on the client and again above, so a
                    // rejection here means something is genuinely wrong.
                    console.error(
                        `Feil i kall til tilbakemeldingsmottak-api: ${errorText}`
                    );

                    try {
                        return c.json(
                            JSON.parse(errorText),
                            response.status as 400
                        );
                    } catch {
                        console.error(
                            `Kunne ikke parse feilmelding fra tilbakemeldingsmottak-api som JSON: ${errorText}`
                        );
                        return c.text(errorText, response.status as 400);
                    }
                }

                return c.json(await response.json(), response.status as 200);
            } catch (error) {
                console.error(
                    `Feil i postToTilbakemeldingsmottakHandler: ${error}`
                );
                return c.text('Internal server error', 500);
            }
        }
    );
