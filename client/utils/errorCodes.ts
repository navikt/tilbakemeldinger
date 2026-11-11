import { errorCodeOf } from '#client/types/errors.ts';

export const submitErrorMessage = (error: unknown): string =>
	errorCodeOf(error) === 'EREG_NOT_FOUND' ? 'feilmelding.orgnr' : 'feilmelding.generell';
