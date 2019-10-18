import { vars } from "./Config";
import Environment from "./Environments";

const fetchUnleashFeatures = (features: Array<string>) => {
  const getUrl = `${Environment().unleashUrl}?${features.map(f => `feature=${f}`).join("&")}`;
  return Promise.race([
    fetch(getUrl, {method: "GET"})
      .then(r => r.json()),
    new Promise((res, rej) => setTimeout(() => {
      return rej(new Error("Unleash timed out."));
    }, vars.unleashTimeout))
  ]);
};

export default {
  fetchUnleashFeatures,
};
