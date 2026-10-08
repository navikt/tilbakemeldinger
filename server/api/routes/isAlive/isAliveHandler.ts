import type { Handler } from 'hono';

export const isAliveHandler: Handler = (c) => {
	return c.json({ message: 'I am alive!' });
};
