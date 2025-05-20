import { z } from 'zod';

export const AuthInfoSchema = z.union([
    z.object({
        loaded: z.literal(true),
        authenticated: z.literal(true),
        name: z.string(),
        securityLevel: z.string(),
    }),
    z.object({
        loaded: z.boolean(),
        authenticated: z.literal(false),
    }),
]);

export type AuthInfo = z.infer<typeof AuthInfoSchema>;
