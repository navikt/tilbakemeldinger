import { errorCodeOf } from '#client/types/errors.ts';

export const submitErrorMessage = (error: unknown): string => {
	switch (errorCodeOf(error)) {
		case 'EREG_NOT_FOUND':
			return 'feilmelding.orgnr';
		default:
			return 'feilmelding.generell';
	}
};
