import { AuthInfo } from "../types/authInfo";
import { KontaktInfo } from "../types/kontaktInfo";
import { Sprak } from "../types/sprak";
import sprak from "../language/provider";

export const initialState = {
  locale: "nb" as "nb",
  language: sprak,
  auth: {
    authenticated: false
  } as AuthInfo,
  fodselsnr: "",
  kontaktInfo: {
    mobiltelefonnummer: ""
  }
};

export interface Store {
  locale: "nb";
  language: Sprak;
  auth: AuthInfo;
  fodselsnr: string;
  kontaktInfo: KontaktInfo;
}

export type Action =
  | {
      type: "SETT_AUTH_RESULT";
      payload: AuthInfo;
    }
  | {
      type: "SETT_FODSELSNR";
      payload: {
        fodselsnr: string;
      };
    }
  | {
      type: "SETT_KONTAKT_INFO_RESULT";
      payload: KontaktInfo;
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_AUTH_RESULT":
      return {
        ...state,
        auth: action.payload as AuthInfo
      };
    case "SETT_FODSELSNR":
      return {
        ...state,
        fodselsnr: action.payload.fodselsnr
      };
    case "SETT_KONTAKT_INFO_RESULT":
      return {
        ...state,
        kontaktInfo: action.payload as KontaktInfo
      };
    default:
      return state;
  }
};
