import { Context, Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { validator } from 'hono/validator';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { decodeJwt } from 'jose';
import type zod from 'zod';
import { getAccessToken, getAuthToken } from '../auth/common.js';
import { rateLimit } from '../middleware/rateLimit.js';
import { URLs } from '../utils/urls.js';
import { env, isLocalhost } from '../env.js';
import { enheterSchema } from '../../common/schema/enhet.js';
import { serviceKlageSchema } from '../../common/schema/ServiceKlage.js';
import { feilOgManglerSchema } from '../../common/schema/FeilOgMangler.js';
import { rosTilNavSchema } from '../../common/schema/RosTilNav.js';

const NORG2_API_URL = `${URLs.norg2Origin}${URLs.norg2Path}`;

/**
 * Validates the JSON body at the route rather than inside the handler, so the
 * handler receives it already parsed and typed via `c.req.valid('json')`.
 * Hono answers a malformed body with its own 400 before this runs.
 */
const jsonBody = <T>(schema: zod.ZodType<T>) =>
    validator('json', (value, c) => {
        const result = schema.safeParse(value);

        if (!result.success) {
            return c.text('Feil i validering av skjema', 400);
        }

        return result.data;
    });

/*
 * Both limiters key on the same client (the user's token if present, otherwise
 * the forwarded IP) and differ only in window — so they are a burst limit and a
 * sustained one, not the "global vs IP" pair the old messages implied. Per pod:
 * prod runs 2-4 replicas.
 */

/** Shared by the three submission routes; each supplies its own upstream path. */
const forwardToMottak = async (
    c: Context,
    body: unknown,
    { apiPath, onBehalfOfUser }: { apiPath: string; onBehalfOfUser: boolean }
) => {
    // API_URL is only defined in deployed environments; locally the client
    // mocks /api, so this path is unreachable there.
    if (isLocalhost(env)) {
        return c.text('API_URL er ikke konfigurert på localhost', 501);
    }

    const accessToken = await getAccessToken({
        authHeader: c.req.header('authorization'),
        onBehalfOfUser,
    });

    if (!accessToken) {
        return c.text('Failed to populate auth header', 500);
    }

    try {
        const response = await fetch(`${env.API_URL}${apiPath}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        });

        const status = response.status as ContentfulStatusCode;

        if (!response.ok) {
            const errorText = await response.text();

            // The body was validated on the client and again at the route, so a
            // rejection here means something is genuinely wrong.
            console.error(
                `Feil i kall til tilbakemeldingsmottak-api: ${errorText}`
            );

            // Pass the upstream error through in whatever shape it arrived.
            try {
                return c.json(JSON.parse(errorText), status);
            } catch {
                return c.text(errorText, status);
            }
        }

        return c.json(await response.json(), status);
    } catch (error) {
        console.error(`Feil ved innsending til ${apiPath}: ${error}`);
        return c.text('Internal server error', 500);
    }
};

export const apiRoutes = new Hono()
    // Applied by path rather than repeated per route. Registered before the
    // routes so it runs ahead of them; spreading these into each .post() would
    // break Hono's inference and leave c.req.valid('json') typed as never.
    .use(
        '/mottak/*',
        bodyLimit({ maxSize: 100 * 1024 }),
        rateLimit({
            windowMs: 2 * 60 * 1000,
            max: 5,
            message: 'For mange innsendinger på kort tid',
        }),
        rateLimit({
            windowMs: 30 * 60 * 1000,
            max: 100,
            message: 'For mange innsendinger',
        })
    )

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
        const json = await fetch(NORG2_API_URL)
            .then((norgRes) => norgRes.json())
            .catch((e) => {
                console.error(`Error fetching enheter from norg2 - ${e}`);
                return null;
            });

        // norg2 is not ours, so its response is validated rather than trusted.
        // A shape change fails loudly here instead of surfacing as undefined
        // entries in the office picker.
        const enheter = enheterSchema.safeParse(json);

        if (!enheter.success) {
            console.error('Uventet svar fra norg2 - se enhetSchema');
            return c.text('Lasting av enheter feilet', 500);
        }

        return c.json(enheter.data);
    })

    // Three known submissions, each declaring its own schema and upstream path,
    // rather than one parameterised route resolving them at request time.
    .post('/mottak/ros', jsonBody(rosTilNavSchema), (c) =>
        forwardToMottak(c, c.req.valid('json'), {
            apiPath: '/rest/ros',
            onBehalfOfUser: false,
        })
    )
    .post('/mottak/feil-og-mangler', jsonBody(feilOgManglerSchema), (c) =>
        forwardToMottak(c, c.req.valid('json'), {
            apiPath: '/rest/feil-og-mangler',
            onBehalfOfUser: false,
        })
    )
    .post('/mottak/serviceklage', jsonBody(serviceKlageSchema), (c) =>
        forwardToMottak(c, c.req.valid('json'), {
            apiPath: '/rest/v2/serviceklage',
            onBehalfOfUser: true,
        })
    )

    // Must stay last. A sub-app's own notFound() is ignored once mounted, so
    // without this an unknown API path falls through to the site catch-all and
    // is answered with the rendered page - HTML, status 200, for a typo.
    .all('/*', (c) => c.text('Not found', 404));
