import zod from 'zod';
import { RequiredString } from './helpers.js';

const baseRosTilNavSchema = zod.object({
    melding: RequiredString,
});

export const rosNavKontaktsenterSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_KONTAKTSENTER'),
});

export const rosNavDigitaleTjenesterSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_DIGITALE_TJENESTER'),
});

export const rosNavKontorSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_KONTOR'),
    navKontor: RequiredString,
});

export const rosTilNavSchema = zod.discriminatedUnion('hvemRoses', [
    rosNavKontaktsenterSchema,
    rosNavDigitaleTjenesterSchema,
    rosNavKontorSchema,
]);

export type RosTilNavSchemaType = zod.infer<typeof rosTilNavSchema>;
