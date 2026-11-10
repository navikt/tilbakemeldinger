import { AuthInfo } from '#client/types/authInfo.ts';
import { KontaktInfo } from '#client/types/kontaktInfo.ts';
import { FetchEnheter } from '#client/types/enheter.ts';
import { Locale } from '#shared/locale.ts';

export const initialState = {
	fodselsnr: '',
	enheter: { status: 'LOADING' } as FetchEnheter,
	auth: { authenticated: false, loaded: false } as AuthInfo,
	kontaktInfo: { mobiltelefonnummer: '' },
};

export interface Store {
	fodselsnr: string;
	locale: Locale;
	enheter: FetchEnheter;
	auth: AuthInfo;
	kontaktInfo: KontaktInfo;
}

export type Action =
	| {
			type: 'SETT_ENHETER';
			payload: FetchEnheter;
	  }
	| {
			type: 'SETT_AUTH_RESULT';
			payload: AuthInfo;
	  }
	| {
			type: 'SETT_FODSELSNR';
			payload: {
				fodselsnr: string;
			};
	  }
	| {
			type: 'SETT_KONTAKT_INFO_RESULT';
			payload: KontaktInfo;
	  }
	| {
			type: 'SETT_LOCALE';
			payload: Locale;
	  };

export const reducer = (state: Store, action: Action) => {
	switch (action.type) {
		case 'SETT_AUTH_RESULT':
			return {
				...state,
				auth: { ...action.payload, loaded: true } as AuthInfo,
			};
		case 'SETT_ENHETER':
			return {
				...state,
				enheter: action.payload,
			};
		case 'SETT_FODSELSNR':
			return {
				...state,
				fodselsnr: action.payload.fodselsnr,
			};
		case 'SETT_KONTAKT_INFO_RESULT':
			return {
				...state,
				kontaktInfo: action.payload,
			};
		case 'SETT_LOCALE':
			return {
				...state,
				locale: action.payload,
			};
		default:
			return state;
	}
};
