import { corgi, isHttpError, isTimeoutError } from '@itsy/corgi';
import { withTimeout } from '@itsy/corgi/timeout';
import type { Context } from 'hono';
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

// Checks the body against the schema for :path
// - A body that isn't valid JSON is a 400
// - Any other content type is validated as {}.
// The raw body is passed on, not the parsed one, so we forward exactly what was sent
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

const tilbakemeldingsmottak = corgi.create({ baseURL: env.API_URL, plugins: [withTimeout(30_000)] });

const factory = createFactory<AppEnv, '/mottak/:path'>();

const stringifyData = (data: unknown): string => {
	if (typeof data === 'string') return data;
	if (data === undefined) return '';
	return JSON.stringify(data);
};

const handleUpstreamError = (c: Context<AppEnv>, error: unknown) => {
	if (isHttpError(error)) {
		setFailureReason(c, 'upstream');
		const status = error.status as ContentfulStatusCode;
		const { data } = error;
		const text = stringifyData(data);

		// Logging here because validation is done in both frontend and further up,
		// so something is actually wrong at this point
		console.error(`Feil i kall til tilbakemeldingsmottak-api: ${error.status} ${text}`);

		return typeof data === 'object' && data !== null ? c.json(data, status) : c.text(text, status);
	}

	if (isTimeoutError(error)) {
		setFailureReason(c, 'upstream');
		console.error('tilbakemeldingsmottak-api did not answer within 30 seconds');
		return c.text('Gateway timeout', { status: 504 });
	}

	console.error(`Feil i postToTilbakemeldingsmottakHandler: ${String(error)}`);
	setFailureReason(c, 'internal');
	return c.text('Internal server error', { status: 500 });
};

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
		return handleUpstreamError(c, error);
	}
});
