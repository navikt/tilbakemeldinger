import type { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import { URLs } from '#server/urls.ts';
import type { AppEnv } from '#server/types.ts';

// Fetch static 404-page from the nav.no frontend
const fetchNotFoundHtml = () =>
	fetch(URLs.navno404)
		.then((res) => {
			if (res.status === 404) {
				return res.text();
			}

			throw Error(`${res.status} ${res.statusText}`);
		})
		.catch((e) => {
			console.error(`Failed to fetch 404 html - ${e}`);
			return 'Not found';
		});

export const setupErrorHandlers = async (app: Hono<AppEnv>) => {
	const notFoundHtml = await fetchNotFoundHtml();

	app.notFound((c) => c.html(notFoundHtml, { status: 404 }));

	app.onError((err, c) => {
		const { path } = c.req;
		const statusCode = err instanceof HTTPException ? err.status : 500;
		const msg = err.stack?.split('\n')[0];

		if (statusCode < 500) {
			console.log(`Invalid request to ${path}: ${statusCode} ${msg}`);
			return c.html(notFoundHtml, { status: 404 });
		}

		console.error(`Server error on ${path}: ${statusCode} ${msg}`);

		return c.body(null, { status: statusCode });
	});
};
