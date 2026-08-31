import { NotFoundHandler } from 'hono';
import { URLs } from './urls.js';

export const createNotFoundHandler = async (): Promise<NotFoundHandler> => {
    // Fetch the static 404 page from the nav.no frontend once at startup.
    const notFoundHtml = await fetch(URLs.navno404)
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

    return (c) => c.html(notFoundHtml, 404);
};
