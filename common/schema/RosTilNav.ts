import zod from 'zod';
import { zodString } from './helpers';

const baseRosTilNavSchema = zod.object({
    melding: zodString,
});

export const RosNavKontaktsenterSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_KONTAKTSENTER'),
});

export const RosNavDigitaleTjenesterSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_DIGITALE_TJENESTER'),
});

export const RosNavKontorSchema = baseRosTilNavSchema.extend({
    hvemRoses: zod.literal('NAV_KONTOR'),
    navKontor: zodString,
});

export const RosTilNavSchema = zod.discriminatedUnion('hvemRoses', [
    RosNavKontaktsenterSchema,
    RosNavDigitaleTjenesterSchema,
    RosNavKontorSchema,
]);

export type RosTilNavSchemaType = zod.infer<typeof RosTilNavSchema>;
