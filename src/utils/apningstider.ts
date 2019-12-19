import moment from "moment-timezone";
import { ApningstiderUke, AvviksPeriode, DatoTidsrom, Tidsrom, Ukedager } from "../types/datotid";
import { Moment } from "moment-timezone/moment-timezone";

export default class ApningsTider {
  constructor(ukedager: ApningstiderUke, avviksPerioder: Array<AvviksPeriode> = [], timeZone: string = "Europe/Oslo") {
    this._ukedager = ukedager;
    this._avviksPerioder = avviksPerioder;
    this._timeZone = timeZone;
  }

  private readonly _ukedager: {[dag in Ukedager]: Tidsrom};
  private readonly _avviksPerioder: Array<AvviksPeriode>;
  private readonly _timeZone: string;

  get ukedager(): {[dag in Ukedager]: Tidsrom} {
    return this._ukedager;
  }

  get avviksPerioder(): Array<AvviksPeriode> {
    return this._avviksPerioder;
  }

  public isOpenNow = (timeOffsetMs = 0) => {
    const naaTid = moment().add(timeOffsetMs, "ms").tz(this._timeZone);
    const dato = naaTid.format("DD-MM-YYYY");

    for (let i = 0; i < this.avviksPerioder.length; i++) {
      const avviksTidsrom = this.avviksPerioder[i].datoer[dato];
      if (avviksTidsrom === null) {
        return false;
      }

      if (avviksTidsrom) {
        return this.isTimeInRange(naaTid, avviksTidsrom.start, avviksTidsrom.end, "HH:mm");
      }
    }

    const ukedag = (naaTid.day()) as Ukedager;
    const dagensApningstid = this.ukedager[ukedag];

    if (!dagensApningstid) {
      return false;
    }

    return this.isTimeInRange(naaTid, dagensApningstid.start, dagensApningstid.end, "HH:mm");
  };

  getAktuelleAvvikstider = (timeOffsetMs: number = 0): Array<DatoTidsrom> => {
    const naaTid = moment().add(timeOffsetMs, "ms").tz(this._timeZone);

    return this.avviksPerioder.reduce((acc, periode) => {
      if (naaTid.isBefore(moment.tz(periode.visFraDato, "DD-MM-YYYY", this._timeZone))) {
        return acc;
      }

      const datoer = Object.keys(periode.datoer);
      datoer.forEach(dato =>
        naaTid.isSameOrBefore(moment.tz(dato, "DD-MM-YYYY", this._timeZone), "day")
          ? acc.push({dato: dato, tidsrom: periode.datoer[dato]})
          : null
      );

      return acc;
    }, [] as DatoTidsrom[]).sort(
      (a: DatoTidsrom, b: DatoTidsrom) =>
        moment(a.dato, "DD-MM-YYYY").isBefore(moment(b.dato, "DD-MM-YYYY")) ? -1 : 1);
  };

  private isTimeInRange = (time: Moment, start: string, end: string, format: string): boolean => {
    return time.isBetween(
      moment.tz(start, format, this._timeZone),
      moment.tz(end, format, this._timeZone));
  }
}
