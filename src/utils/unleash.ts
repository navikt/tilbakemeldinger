import api from "../Api";

export const fetchUnleashToggleStatus = (featureToggleName: string, callback: Function) => {
  api.fetchUnleashFeatures([featureToggleName])
    .then((features) => {
      callback(features[featureToggleName]);
    })
    .catch((e: any) => {
      callback(null, e);
    });
};
