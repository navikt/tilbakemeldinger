import { HTTPError } from './errors';
import { Enhet } from '../../common/enhet';

export type FetchEnheter =
    | { status: 'LOADING' }
    | { status: 'RESULT'; data: Enhet[] }
    | { status: 'ERROR'; error: HTTPError };

export type { Enhet };