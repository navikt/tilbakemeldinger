import { HTTPError } from './errors';

export type FetchEnheter =
    | { status: 'LOADING' }
    | { status: 'RESULT'; data: Enhet[] }
    | { status: 'ERROR'; error: HTTPError };

export interface Enhet {
    enhetNr: string;
    navn: string;
    type: string;
    status: string;
}
