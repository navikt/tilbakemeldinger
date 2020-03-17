import { AuthInfo } from "../types/authInfo";
import { KontaktInfo } from "../types/kontaktInfo";
import { Sprak } from "../types/sprak";
import sprak from "../language/provider";
import { Enheter, FetchEnheter } from "../types/enheter";
import { HTTPError } from "../components/error/Error";
import Unleash, { Features } from "../utils/unleash";
import { Alert } from "../utils/sanity/endpoints/alert";
import { FAQ, FAQLenke } from "../utils/sanity/endpoints/faq";
import { Channels, ChannelList } from "../utils/sanity/endpoints/channel";

export const initialState = {
  fodselsnr: "",
  language: sprak,
  locale: "nb" as "nb",
  enheter: {status: "LOADING"} as FetchEnheter,
  auth: {authenticated: false} as AuthInfo,
  kontaktInfo: {mobiltelefonnummer: ""},
  unleashFeatures: Unleash.getFeatureDefaults() as Features,
  visTekniskFeilMelding: false,
  varsler: [],
  faq: {
    isLoaded: false,
    faqLenker: []
  } as FAQ,
  channels: {
    isLoaded: false,
    types: {
      ringOss: {},
      skrivTilOss: {},
      chat: {},
      veileder: {},
    }
  } as Channels,
};

export interface Store {
  locale: "nb";
  language: Sprak;
  auth: AuthInfo;
  fodselsnr: string;
  kontaktInfo: KontaktInfo;
  enheter: FetchEnheter;
  unleashFeatures: Features;
  visTekniskFeilMelding: boolean;
  varsler: Array<Alert>;
  faq: FAQ;
  channels: Channels;
}

export type Action =
  | {
  type: "SETT_ENHETER_RESULT";
  payload: Enheter[];
} | {
  type: "SETT_ENHETER_ERROR";
  payload: HTTPError;
} | {
  type: "SETT_AUTH_RESULT";
  payload: AuthInfo;
} | {
  type: "SETT_FODSELSNR";
  payload: {
    fodselsnr: string;
  };
} | {
  type: "SETT_KONTAKT_INFO_RESULT";
  payload: KontaktInfo;
} | {
  type: "SETT_FEATURE_TOGGLES";
  payload: Features;
} | {
  type: "SETT_VARSLER";
  payload: Array<Alert>;
} | {
  type: "SETT_FAQ";
  payload: FAQLenke[];
} | {
  type: "SETT_CHANNEL_PROPS";
  payload: ChannelList;
} | {
  type: "SETT_CHANNELS_FETCH_FAILED";
} | {
  type: "SETT_TEKNISK_FEILMELDING";
};

export const reducer = (state: Store, action: Action) => {
  switch (action.type) {
    case "SETT_AUTH_RESULT":
      return {
        ...state,
        auth: action.payload as AuthInfo
      };
    case "SETT_ENHETER_RESULT":
      return {
        ...state,
        enheter: {
          status: "RESULT",
          data: action.payload
        } as FetchEnheter
      };
    case "SETT_ENHETER_ERROR":
      return {
        ...state,
        enheter: {
          status: "ERROR",
          error: action.payload
        } as FetchEnheter
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
    case "SETT_FEATURE_TOGGLES":
      return {
        ...state,
        unleashFeatures: Unleash.getValidFeatureToggles(action.payload as Features)
      };
    case "SETT_VARSLER":
      return {
        ...state,
        varsler: action.payload
      };
    case "SETT_FAQ":
      return {
        ...state,
        faq: {
          isLoaded: true,
          faqLenker: action.payload
        }
      };
    case "SETT_CHANNEL_PROPS": {
      return {
        ...state,
        channels: {
          isLoaded: true,
          types: action.payload
        }
      };
    }
    case "SETT_CHANNELS_FETCH_FAILED": {
      return {
        ...state,
        channels: {...state.channels, isLoaded: true},
        visTekniskFeilMelding: true
      };
    }
    case "SETT_TEKNISK_FEILMELDING" :
      return {
        ...state,
        visTekniskFeilMelding: true
      };
    default:
      return state;
  }
};
