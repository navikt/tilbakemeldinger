import type { Handler } from 'hono';

export const isReadyHandler: Handler = (c) => {
	return c.json({ message: 'I am ready!' });
};
