import type { Handler } from 'hono';
import type { ContentfulStatusCode } from 'hono/utils/http-status';
import { getAccessToken } from '#server/utils/auth/common.ts';
import { serviceKlageSchema } from '#shared/schema/ServiceKlage.ts';
import { feilOgManglerSchema } from '#shared/schema/FeilOgMangler.ts';
import { rosTilNavSchema } from '#shared/schema/RosTilNav.ts';
import { setFailureReason } from '#server/utils/metrics.ts';
import { env } from '#server/utils/environment.ts';
import type { AppEnv } from '#server/types.ts';

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

export const postToTilbakemeldingsmottakHandler: Handler<AppEnv, '/mottak/:path'> = async (c) => {
	const path = c.req.param('path');
	const accessToken = await getAccessToken({ authHeader: c.req.header('authorization'), path });
	const body = c.get('body');

	if (path !== 'ros' && path !== 'serviceklage' && path !== 'feil-og-mangler') {
		return c.text('Path not found', 404);
	}

	if (!accessToken) {
		setFailureReason(c, 'auth');
		return c.text('Failed to populate auth header', 500);
	}

	const schema = deriveSchemaFromPath(path);

	const validationResult = schema.safeParse(body);
	if (!validationResult.success) {
		setFailureReason(c, 'validation');
		return c.text('Feil i validering av skjema', 400);
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
				return c.json(errorJson, status);
			} catch {
				console.error(`Kunne ikke parse feilmelding fra tilbakemeldingsmottak-api som JSON: ${errorText}`);
				return c.text(errorText, status);
			}
		}

		const responseData = await response.json();
		return c.json(responseData, response.status as ContentfulStatusCode);
	} catch (error) {
		console.error(`Feil i postToTilbakemeldingsmottakHandler: ${error}`);
		setFailureReason(c, 'internal');
		return c.text('Internal server error', 500);
	}
};
