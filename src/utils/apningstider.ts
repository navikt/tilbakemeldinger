import moment from "moment-timezone";
import { range } from "lodash";
import { ApningsTider, DatoTidsrom, Ukedager } from "../types/datotid";

const isOpenNow = (apningstider: ApningsTider, helligdager?: Set<string>, timeOffsetMs = 0, timeZone = "Europe/Oslo") => {
  const naaTid = moment().add(timeOffsetMs, "ms").tz(timeZone);

  const dato = naaTid.format("DD-MM-YYYY");
  const avvikstider = apningstider.avviksDatoer[dato];

  if ((helligdager && helligdager.has(dato)) || avvikstider === null) {
    return false;
  }

  const ukedag = (naaTid.day()) as Ukedager;
  const dagensApningstid = avvikstider || apningstider[ukedag];

  if (!dagensApningstid) {
    return false;
  }

  const apner = moment.tz(dagensApningstid.start, "HH-mm", timeZone);
  const lukker = moment.tz(dagensApningstid.end, "HH-mm", timeZone);

  return naaTid.isBetween(apner, lukker);
};

const makeAvvikstiderStrings =
  (apningstider: ApningsTider, antallDager: number, helligdager?: Set<string>, timeOffsetMs = 0, timeZone = "Europe/Oslo")
    : Array<DatoTidsrom> => {
  const naaTid = moment().add(timeOffsetMs, "ms").tz(timeZone);
  return range(antallDager).reduce((acc, i) => {
    const dato = naaTid.format("DD-MM-YYYY");
    const avvikstider = apningstider.avviksDatoer[dato];
    if (helligdager && helligdager.has(dato)) {
      acc.push({dato: dato, tidsrom: null});
    } else if (avvikstider !== undefined) {
      acc.push({dato: dato, tidsrom: avvikstider});
    }
    naaTid.add(1, "day");
    return acc;
  }, [] as DatoTidsrom[]);
};

export default {
  isOpenNow,
  makeAvvikstiderStrings,
};
