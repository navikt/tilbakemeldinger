import { corgi, isHttpError } from '@itsy/corgi';
import { createFactory } from 'hono/factory';
import { validator } from 'hono/validator';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import type { ZodType } from 'zod';
import { getAccessToken } from '#server/utils/auth/common.ts';
import { serviceKlageSchema } from '#shared/schema/ServiceKlage.ts';
import { feilOgManglerSchema } from '#shared/schema/FeilOgMangler.ts';
import { rosTilNavSchema } from '#shared/schema/RosTilNav.ts';
import { setFailureReason } from '#server/utils/metrics.ts';
import { env } from '#server/utils/environment.ts';
import type { AppEnv } from '#server/types.ts';

const schemas = new Map<string, ZodType>([
	['ros', rosTilNavSchema],
	['serviceklage', serviceKlageSchema],
	['feil-og-mangler', feilOgManglerSchema],
]);

// Checks the body against the schema for :path. A body that isn't valid JSON is a 400 from
// Hono (see app.ts); any other content type is validated as {}.
// The raw body is passed on, not the parsed one, so what's forwarded is what the client sent.
const validateFeedback = validator('json', (value: unknown, c) => {
	const schema = schemas.get(c.req.param('path') ?? '');
	if (!schema) {
		return c.text('Path not found', { status: 404 });
	}

	if (!schema.safeParse(value).success) {
		setFailureReason(c, 'validation');
		return c.text('Feil i validering av skjema', { status: 400 });
	}

	// The schemas are all objects
	return value as object;
});

const tilbakemeldingsmottak = corgi.create({ baseURL: env.API_URL });

const factory = createFactory<AppEnv, '/mottak/:path'>();

export const postToMottakUpstreamHandler = factory.createHandlers(validateFeedback, async (c) => {
	const path = c.req.param('path');
	const body = c.req.valid('json');
	const accessToken = await getAccessToken({ authHeader: c.req.header('authorization'), path });

	if (!accessToken) {
		setFailureReason(c, 'auth');
		return c.text('Failed to populate auth header', { status: 500 });
	}

	const apiPath = path === 'serviceklage' ? `/rest/v2/${path}` : `/rest/${path}`;

	try {
		const data = await tilbakemeldingsmottak.post(apiPath, {
			headers: { authorization: `Bearer ${accessToken}` },
			body,
		});
		return c.json(data ?? {});
	} catch (error) {
		if (isHttpError(error)) {
			setFailureReason(c, 'upstream');
			const status = error.status as ContentfulStatusCode;
			const { data } = error;
			const text = typeof data === 'string' ? data : data === undefined ? '' : JSON.stringify(data);

			// Log error because validation should have been done both frontend and further up,
			// so something is wrong at this point
			console.error(`Feil i kall til tilbakemeldingsmottak-api: ${error.status} ${text}`);

			// Passed on as it came: JSON (like the errorCode of an error the user can fix) as JSON, anything else as text
			return typeof data === 'object' && data !== null ? c.json(data, status) : c.text(text, status);
		}

		console.error(`Feil i postToTilbakemeldingsmottakHandler: ${String(error)}`);
		setFailureReason(c, 'internal');
		return c.text('Internal server error', { status: 500 });
	}
});
