import zod from 'zod';
import { zodString } from './helpers';

const baseRosTilNavSchema = zod.object({
    melding: zodString,
});

export const rosNavKontaktsenterSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_KONTAKTSENTER'),
});

export const rosNavDigitaleTjenesterSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_DIGITALE_TJENESTER'),
});

export const rosNavKontorSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_KONTOR'),
    navKontor: zodString,
});

export const rosTilNavSchema = zod.discriminatedUnion('hvemRoses', [
    rosNavKontaktsenterSchema,
    rosNavDigitaleTjenesterSchema,
    rosNavKontorSchema,
]);

export type RosTilNavSchemaType = zod.infer<typeof rosTilNavSchema>;
