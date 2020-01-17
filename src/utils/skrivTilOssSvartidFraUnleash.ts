import { Features } from "./unleash";
import { vars } from "../Config";

const featureProps = vars.unleash.features;

const bitArrayToDecimal = (bitArray: Array<boolean>): number => {
  return bitArray.reduce(
    (sum, currentBit, index) => (currentBit ? sum + (2 ** index) : sum), 0);
};

export const skrivTilOssSvartidFraUnleash = (features: Features) => {
  const bitArray = [
    features[featureProps.skrivTilOssSvartidBit1.name],
    features[featureProps.skrivTilOssSvartidBit2.name],
    features[featureProps.skrivTilOssSvartidBit3.name]
  ];
  return bitArrayToDecimal(bitArray) || vars.svartid.skrivTilOss;
};
