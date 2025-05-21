import zod from 'zod';
import { zodString } from './helpers';

// Enums as zod schemas
export const OnBehalfOfSchema = zod.enum([
    'PRIVATPERSON',
    'ANNEN_PERSON',
    'BEDRIFT',
]);

export const ServiceKlageTypeSchema = zod.enum([
    'LOKALT_NAV_KONTOR',
    'TELEFON',
    'NAV_DIGITALE_TJENESTER',
    'BREV',
    'ANNET',
]);

export const SosialhjelpChoiceSchema = zod.enum(['JA', 'NEI', 'VET_IKKE']);

// Base schema for all service complaints
export const ServiceKlageBaseSchema = zod.object({
    klagetekst: zodString,
    oenskerAaKontaktes: zod.boolean().optional(),
    gjelderSosialhjelp: SosialhjelpChoiceSchema.optional(),
    klagetypeUtdypning: zod.string().optional(),
    klagetyper: zod
        .array(ServiceKlageTypeSchema)
        .min(1, 'At least one complaint type must be selected'),
});

// Specific schemas for different complaint types
export const PrivatpersonSchema = zod.object({
    paaVegneAv: zod.literal('PRIVATPERSON'),
    innmelder: zod.object({
        navn: zodString,
        telefonnummer: zod.string().optional(),
        personnummer: zod
            .string()
            .regex(/^\d{11}$/, 'Personal ID number must be 11 digits'),
    }),
});

export const AnnenPersonSchema = zod.object({
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

export const BedriftSchema = zod.object({
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
export const ServiceKlageFragmentSchema = zod.discriminatedUnion('paaVegneAv', [
    PrivatpersonSchema,
    AnnenPersonSchema,
    BedriftSchema,
]);

// Combine the base schema with the fragment schema
export const ServiceKlageSchema = ServiceKlageBaseSchema.and(
    ServiceKlageFragmentSchema
);

export type ServiceKlageSchemaType = zod.infer<typeof ServiceKlageSchema>;
