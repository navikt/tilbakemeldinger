import { createMiddleware } from 'hono/factory';
import { HTTPException } from 'hono/http-exception';
import type { AppEnv } from '#server/types.ts';

// Parses an application/json body into the `body` variable; an empty one is {}. Any other
// content type leaves it undefined. Invalid JSON is a 400, which gets the 404 page (see errorHandlers).
export const jsonBody = createMiddleware<AppEnv>(async (c, next) => {
	const contentType = c.req.header('content-type')?.split(';')[0].trim().toLowerCase();

	if (contentType === 'application/json') {
		const text = await c.req.text();
		try {
			c.set('body', text ? JSON.parse(text) : {});
		} catch (e) {
			throw new HTTPException(400, { message: 'Invalid JSON', cause: e });
		}
	}

	await next();
});
