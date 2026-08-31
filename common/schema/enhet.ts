import zod from 'zod';
import type { Enhet } from '../enhet.js';

/*
 * The shape norg2 returns. This is an API we do not control, so the response is
 * validated rather than asserted — zod strips the fields we don't use, which is
 * what the old hand-written `transformEnhet` was doing by hand.
 *
 * Annotated as ZodType<Enhet> so the schema and the shared type cannot drift.
 * The type itself lives in common/enhet.ts, which the client imports; keeping
 * zod out of that file keeps it out of the browser bundle.
 */
export const enhetSchema: zod.ZodType<Enhet> = zod.object({
    enhetNr: zod.string(),
    navn: zod.string(),
    type: zod.string(),
    status: zod.string(),
});

export const enheterSchema = zod.array(enhetSchema);
