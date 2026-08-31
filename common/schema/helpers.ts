import zod from 'zod';

export const RequiredString = zod.string().trim().min(1, 'Required field');
