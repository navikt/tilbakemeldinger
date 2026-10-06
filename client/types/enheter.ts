import { HTTPError } from './errors';
import { Enhet } from '#shared/enhet.ts';

export type FetchEnheter =
	| { status: 'LOADING' }
	| { status: 'RESULT'; data: Enhet[] }
	| { status: 'ERROR'; error: HTTPError };

export type { Enhet };
