import moment from "moment-timezone";
import { ApningsTider, Ukedager } from "../types/datotid";

const isOpenNow = (apningstider: ApningsTider, stengteDager?: Set<string>, timeOffsetMs = 0, timeZone = "Europe/Oslo") => {
  const naaTid = moment().add(timeOffsetMs, "ms").tz(timeZone);

  if (stengteDager && stengteDager.has(naaTid.format("DD-MM-YYYY"))) {
    return false;
  }

  const dag = (naaTid.day()) as Ukedager;
  const dagensApningstid = apningstider[dag];

  if (!dagensApningstid) {
    return false;
  }

  const apner = moment.tz(dagensApningstid.start, "HH-mm", timeZone);
  const lukker = moment.tz(dagensApningstid.end, "HH-mm", timeZone);

  return naaTid.isBetween(apner, lukker);
};

export default {
  isOpenNow,
};
