import { Enhet } from '#shared/enhet.ts';

export type FetchEnheter = { status: 'LOADING' } | { status: 'RESULT'; data: Enhet[] } | { status: 'ERROR' };

export type { Enhet };
