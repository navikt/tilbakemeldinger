import zod from 'zod';
import { zodString } from './helpers';

export const FeilOgManglerTypeSchema = zod.enum([
    'TEKNISK_FEIL',
    'FEIL_INFO',
    'UNIVERSELL_UTFORMING',
]);

export const FeilOgManglerSchema = zod.object({
    onskerKontakt: zod.boolean(),
    epost: zod.string().email('Invalid email address').optional(),
    feiltype: FeilOgManglerTypeSchema,
    melding: zodString,
});

export type FeilOgManglerSchemaType = zod.infer<typeof FeilOgManglerSchema>;
