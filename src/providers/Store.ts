import { AuthInfo } from "../types/authInfo";
import { KontaktInfo } from "../types/kontaktInfo";

export const initialState = {
  auth: {
    authenticated: false
  } as AuthInfo,
  personnr: "",
  kontaktInfo: {
    mobiltelefonnummer: ""
  }
};

export interface Store {
  auth: AuthInfo;
  personnr: string;
  kontaktInfo: KontaktInfo;
}

export type Action =
  | {
      type: "SETT_AUTH_RESULT";
      payload: AuthInfo;
    }
  | {
      type: "SETT_PERSONNR";
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
    case "SETT_PERSONNR":
      return {
        ...state,
        personnr: action.payload
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
