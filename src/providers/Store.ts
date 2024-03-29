import { AuthInfo } from 'types/authInfo';
import { KontaktInfo } from 'types/kontaktInfo';
import { Enhet, FetchEnheter } from 'types/enheter';
import { HTTPError } from 'types/errors';
import { Locale } from 'common/locale';

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
          type: 'SETT_ENHETER_RESULT';
          payload: Enhet[];
      }
    | {
          type: 'SETT_ENHETER_ERROR';
          payload: HTTPError;
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
        case 'SETT_ENHETER_RESULT':
            return {
                ...state,
                enheter: {
                    status: 'RESULT',
                    data: action.payload,
                } as FetchEnheter,
            };
        case 'SETT_ENHETER_ERROR':
            return {
                ...state,
                enheter: {
                    status: 'ERROR',
                    error: action.payload,
                } as FetchEnheter,
            };
        case 'SETT_FODSELSNR':
            return {
                ...state,
                fodselsnr: action.payload.fodselsnr,
            };
        case 'SETT_KONTAKT_INFO_RESULT':
            return {
                ...state,
                kontaktInfo: action.payload as KontaktInfo,
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
