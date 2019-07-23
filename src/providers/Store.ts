import { FetchAuthInfo } from "../App";
import { AuthInfo } from "../types/authInfo";
import { HTTPError } from "../components/error/Error";

export interface FeatureToggles {
  [key: string]: boolean;
}

export const initialState = {
  auth: { status: "LOADING" } as FetchAuthInfo
};

export interface Store {
  auth: FetchAuthInfo;
}

export type Action =
  | {
      type: "SETT_AUTH_RESULT";
      payload: AuthInfo;
    }
  | {
      type: "SETT_AUTH_ERROR";
      payload: HTTPError;
    };

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_AUTH_RESULT":
      return {
        ...state,
        auth: {
          status: "RESULT",
          data: action.payload
        } as FetchAuthInfo
      };
    case "SETT_AUTH_ERROR":
      return {
        ...state,
        auth: {
          status: "ERROR",
          error: action.payload
        } as FetchAuthInfo
      };
    default:
      return state;
  }
};
