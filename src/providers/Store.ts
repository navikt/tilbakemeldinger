import { AuthInfo } from "../types/authInfo";
import { KontaktInfo } from "../types/kontaktInfo";

export const initialState = {
  auth: {
    authenticated: false
  } as AuthInfo,
  fodselsnr: "",
  kontaktInfo: {
    mobiltelefonnummer: ""
  }
};

export interface Store {
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
      payload: string;
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
        fodselsnr: action.payload
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
