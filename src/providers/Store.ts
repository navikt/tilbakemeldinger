import { AuthInfo } from "../types/authInfo";

export const initialState = {
  auth: {
    authenticated: false
  } as AuthInfo
};

export interface Store {
  auth: AuthInfo;
}

export type Action = {
  type: "SETT_AUTH_RESULT";
  payload: AuthInfo;
};

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_AUTH_RESULT":
      return {
        ...state,
        auth: action.payload as AuthInfo
      };
    default:
      return state;
  }
};
