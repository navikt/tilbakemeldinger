import zod from 'zod';
import { RequiredString } from './helpers.js';

export const FeilOgManglerTypeSchema = zod.enum([
    'TEKNISK_FEIL',
    'FEIL_INFO',
    'UNIVERSELL_UTFORMING',
]);

export const feilOgManglerSchema = zod.object({
    onskerKontakt: zod.boolean(),
    epost: zod.email('Invalid email address').optional(),
    feiltype: FeilOgManglerTypeSchema,
    melding: RequiredString,
});

export type FeilOgManglerSchemaType = zod.infer<typeof feilOgManglerSchema>;
