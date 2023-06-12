export const resolveErrorCode = (errorCode: string): string => {
    switch (errorCode) {
        case 'EREG_NOT_FOUND':
            return 'feilmelding.orgnr';
        default:
            return 'feilmelding.generell';
    }
};
