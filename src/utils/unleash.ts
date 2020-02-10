import Environment from "../Environments";
import { vars } from "../Config";

export type Features = {
  [key: string]: boolean;
};

type CallbackTypeSingle = (isEnabled: boolean, error?: any) => void;
type CallbackTypeMultiple = (features: Features, error?: any) => void;

const getFeatureDefaults = (): Features => Object.entries(vars.unleash.features).reduce(
  (defaults, feature) => (
    {...defaults, [feature[1].name]: feature[1].default}
  ), {});

const getValidFeatureToggles = (features: Features): Features => {
  const defaultToggles = getFeatureDefaults() as Features;
  return Object.keys(defaultToggles).reduce((acc, feature) => {
    const toggle = features[feature];
    // noinspection PointlessBooleanExpressionJS
    const validToggle = toggle === true || toggle === false ? toggle : defaultToggles[feature];
    return {...acc, [feature]: validToggle};
  }, {});
};

const fetchUnleashFeatures = (features: Array<string>) => {
  const url = `${Environment().unleashUrl}?${features.map(f => `feature=${f}`).join("&")}`;
  return Promise.race([
    fetch(url, {method: "GET"})
      .then(r => r.json()),
    new Promise((res, rej) => setTimeout(() => {
      return rej(new Error("Unleash timed out."));
    }, vars.unleash.timeout))
  ]);
};

const unleashMultipleToSingleCallback = (featureToggleName: string, callbackSingle: CallbackTypeSingle) =>
  (features: Features, error?: any) => {
    callbackSingle(features[featureToggleName], error);
  };

const getFeatureToggleStatusMultiple = (featureToggleNames: Array<string>, callback: CallbackTypeMultiple) => {
  fetchUnleashFeatures(featureToggleNames)
    .then((features) => {
      // @ts-ignore
      callback(features);
    })
    .catch((e: any) => {
      callback({}, e);
    });
};

const getFeatureToggleStatus = (featureToggleName: string, callback: CallbackTypeSingle) => {
  getFeatureToggleStatusMultiple([featureToggleName], unleashMultipleToSingleCallback(featureToggleName, callback));
};

export default {
  getFeatureToggleStatus,
  getFeatureToggleStatusMultiple,
  getFeatureDefaults,
  getValidFeatureToggles,
};
