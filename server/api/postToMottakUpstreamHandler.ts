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
// Hono, which gets the 404 page (see errorHandlers); any other content type is validated as {}.
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

	return value;
});

const factory = createFactory<AppEnv, '/mottak/:path'>();

export const postToMottakUpstreamHandler = factory.createHandlers(validateFeedback, async (c) => {
	const path = c.req.param('path');
	const body = c.req.valid('json');
	const accessToken = await getAccessToken({ authHeader: c.req.header('authorization'), path });

	if (!accessToken) {
		setFailureReason(c, 'auth');
		return c.text('Failed to populate auth header', { status: 500 });
	}

	try {
		const apiPath = path === 'serviceklage' ? `/rest/v2/${path}` : `/rest/${path}`;
		const response = await fetch(`${env.API_URL}${apiPath}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${accessToken}`,
			},
			body: JSON.stringify(body),
		});

		if (!response.ok) {
			setFailureReason(c, 'upstream');
			const status = response.status as ContentfulStatusCode;
			const errorText = await response.text();

			// Log error because validation should have been done both frontend and further up,
			// so something is wrong at this point
			console.error(`Feil i kall til tilbakemeldingsmottak-api: ${errorText}`);

			// Try to parse as JSON, otherwise return the raw text
			try {
				const errorJson = JSON.parse(errorText);
				return c.json(errorJson, { status });
			} catch {
				console.error(`Kunne ikke parse feilmelding fra tilbakemeldingsmottak-api som JSON: ${errorText}`);
				return c.text(errorText, { status });
			}
		}

		const responseData = await response.json();
		return c.json(responseData, { status: response.status as ContentfulStatusCode });
	} catch (error) {
		console.error(`Feil i postToTilbakemeldingsmottakHandler: ${error}`);
		setFailureReason(c, 'internal');
		return c.text('Internal server error', { status: 500 });
	}
});
