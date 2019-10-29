import api from "../Api";

export interface Features {
  [key: string]: boolean;
}

type CallbackTypeSingle = (isEnabled: boolean, error?: any) => void;
type CallbackTypeMultiple = (features: Features, error?: any) => void;

const unleashMultipleToSingleCallback = (featureToggleName: string, callbackSingle: CallbackTypeSingle) =>
  (features: Features, error?: any) => {
    callbackSingle(features[featureToggleName], error);
  };

export const getFeatureToggleStatusMultiple = (featureToggleNames: Array<string>, callback: CallbackTypeMultiple) => {
  api.fetchUnleashFeatures(featureToggleNames)
    .then((features) => {
      // @ts-ignore
      callback(features);
    })
    .catch((e: any) => {
      callback({}, e);
    });
};

export const getFeatureToggleStatus = (featureToggleName: string, callback: CallbackTypeSingle) => {
  getFeatureToggleStatusMultiple([featureToggleName], unleashMultipleToSingleCallback(featureToggleName, callback));
};
