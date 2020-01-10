import Unleash, { Features } from "./unleash";

type CallbackType = (n: number) => void;

const bitArrayFeatures = ["kontakt-oss.svartid1", "kontakt-oss.svartid2", "kontakt-oss.svartid3"];

const bitArrayToDecimal = (bitArray: Array<boolean>): number => {
  return bitArray.reduce(
    (sum, currentBit, index) => (currentBit ? sum + (2 ** index) : sum), 0);
};

const unleashCallback = (callback: CallbackType) => (features: Features) => {
  const svartid = bitArrayToDecimal(
    Object.keys(features).sort().map(key => features[key]));
  svartid > 0 && callback(svartid);
};

export const svartidFraUnleash = (callback: CallbackType) => {
  Unleash.getFeatureToggleStatusMultiple(bitArrayFeatures, unleashCallback(callback));
};
