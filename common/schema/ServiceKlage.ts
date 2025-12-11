import zod from 'zod';
import { zodString } from './helpers';

// Enums as zod schemas
export const onBehalfOfSchema = zod.enum([
    'PRIVATPERSON',
    'ANNEN_PERSON',
    'BEDRIFT',
]);

export const serviceKlageTypeSchema = zod.enum([
    'LOKALT_NAV_KONTOR',
    'TELEFON',
    'NAV_DIGITALE_TJENESTER',
    'BREV',
    'ANNET',
]);

export const sosialhjelpChoiceSchema = zod.enum(['JA', 'NEI', 'VET_IKKE']);

// Base schema for all service complaints
export const serviceKlageBaseSchema = zod.object({
    klagetekst: zodString,
    oenskerAaKontaktes: zod.boolean().optional(),
    gjelderSosialhjelp: sosialhjelpChoiceSchema.optional(),
    klagetypeUtdypning: zod.string().optional(),
    klagetyper: zod
        .array(serviceKlageTypeSchema)
        .min(1, 'At least one complaint type must be selected'),
});

// Specific schemas for different complaint types
export const privatpersonSchema = zod.object({
    paaVegneAv: zod.literal('PRIVATPERSON'),
    innmelder: zod.object({
        navn: zodString,
        telefonnummer: zod.string().optional(),
        personnummer: zod
            .string()
            .regex(/^\d{11}$/, 'Personal ID number must be 11 digits'),
    }),
});

export const annenPersonSchema = zod.object({
    paaVegneAv: zod.literal('ANNEN_PERSON'),
    innmelder: zod.object({
        navn: zodString,
        telefonnummer: zod.string().optional(),
        harFullmakt: zod.boolean(),
        rolle: zodString,
    }),
    paaVegneAvPerson: zod.object({
        navn: zodString,
        personnummer: zod
            .string()
            .regex(/^\d{11}$/, 'Personal ID number must be 11 digits'),
    }),
});

export const bedriftSchema = zod.object({
    paaVegneAv: zod.literal('BEDRIFT'),
    enhetsnummerPaaklaget: zodString,
    innmelder: zod.object({
        navn: zodString,
        telefonnummer: zod.string().optional(),
        rolle: zod.string().optional(),
    }),
    paaVegneAvBedrift: zod.object({
        navn: zodString,
        organisasjonsnummer: zod
            .string()
            .regex(/^\d{9}$/, 'Organization number must be 9 digits'),
        postadresse: zod.string().optional(),
    }),
});

// Create a discriminated union based on the paaVegneAv field
export const serviceKlageFragmentSchema = zod.discriminatedUnion('paaVegneAv', [
    privatpersonSchema,
    annenPersonSchema,
    bedriftSchema,
]);

// Combine the base schema with the fragment schema
export const serviceKlageSchema = serviceKlageBaseSchema
    .and(serviceKlageFragmentSchema)
    .refine(
        (data) => {
            if (data.paaVegneAv === 'BEDRIFT') {
                return data.oenskerAaKontaktes === true;
            }
            return true;
        },
        {
            message:
                'oenskerAaKontaktes must be true when paaVegneAv is BEDRIFT',
            path: ['oenskerAaKontaktes'],
        }
    );

export type ServiceKlageSchemaType = zod.infer<typeof serviceKlageSchema>;
