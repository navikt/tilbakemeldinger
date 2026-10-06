import zod from 'zod';

export const zodString = zod.string().trim().min(1, 'Required field');
