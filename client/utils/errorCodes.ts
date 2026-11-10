import { errorCodeOf } from '#client/types/errors.ts';

// The message for a submission that failed: its own for errors the user can fix, otherwise a general one
export const submitErrorMessage = (error: unknown): string => {
	switch (errorCodeOf(error)) {
		case 'EREG_NOT_FOUND':
			return 'feilmelding.orgnr';
		default:
			return 'feilmelding.generell';
	}
};
