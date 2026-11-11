import { isHttpError } from '@itsy/corgi';

// The errorCode tilbakemeldingsmottak-api sends for errors the user can fix (utils/errorCodes.ts)
export const errorCodeOf = (error: unknown) => {
	const data: unknown = isHttpError(error) ? error.data : undefined;
	return typeof data === 'object' && data !== null && 'errorCode' in data && typeof data.errorCode === 'string'
		? data.errorCode
		: undefined;
};

// What we send APM about a failed request, besides the error itself
export const errorContext = (error: unknown) =>
	isHttpError(error) ? { status: error.status, errorCode: errorCodeOf(error) } : {};
