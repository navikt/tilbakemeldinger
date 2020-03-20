import moment from "moment-timezone";
import { ApningstiderUke, AvviksPeriode, DatoTidsrom, Tidsrom, Ukedag } from "../types/datotid";
import { Moment } from "moment-timezone/moment-timezone";
import { vars } from "../Config";

export default class ApningsTider {
  constructor(ukedager: ApningstiderUke, avviksPerioder: Array<AvviksPeriode> = [], chatbotStengt: boolean = false, timeZone: string = "Europe/Oslo",
              datoTidFormat: string = vars.defaultDatoTidFormat) {
    this._ukedager = ukedager;
    this._avviksPerioder = avviksPerioder;
    this._timeZone = timeZone;
    this._datoTidFormat = datoTidFormat;
    this._chatbotStengt = chatbotStengt;
  }

  private readonly _ukedager: {[dag in Ukedag]: Tidsrom};
  private readonly _avviksPerioder: Array<AvviksPeriode>;
  private readonly _timeZone: string;
  private readonly _datoTidFormat: string;
  private readonly _chatbotStengt: boolean;

  get ukedager(): {[dag in Ukedag]: Tidsrom} {
    return this._ukedager;
  }

  get avviksPerioder(): Array<AvviksPeriode> {
    return this._avviksPerioder;
  }

  public getChatbotStengt(): boolean {
    return this._chatbotStengt;
  }

  public isOpenNow = (timeOffsetMs = 0) => {
    const naaTid = moment().add(timeOffsetMs, "ms").tz(this._timeZone);
    const dato = naaTid.format(vars.defaultDatoFormat);

    for (let i = 0; i < this.avviksPerioder.length; i++) {
      const avviksTidsrom = this.avviksPerioder[i].datoer[dato];
      if (avviksTidsrom === null) {
        return false;
      }

      if (avviksTidsrom) {
        return this.isTimeInRange(naaTid, avviksTidsrom.start, avviksTidsrom.end, "HH:mm");
      }
    }

    const ukedag = (naaTid.day()) as Ukedag;
    const dagensApningstid = this.ukedager[ukedag];

    if (!dagensApningstid) {
      return false;
    }

    return this.isTimeInRange(naaTid, dagensApningstid.start, dagensApningstid.end, "HH:mm");
  };

  getAktuelleAvvikstider = (timeOffsetMs: number = 0): Array<DatoTidsrom> => {
    const naaTid = moment().add(timeOffsetMs, "ms").tz(this._timeZone);

    return this.avviksPerioder.reduce((acc, periode) => {
      if (naaTid.isBefore(moment.tz(periode.visFraDato, this._datoTidFormat, this._timeZone))) {
        return acc;
      }

      const datoer = Object.keys(periode.datoer);
      datoer.forEach(dato =>
        naaTid.isSameOrBefore(moment.tz(dato, vars.defaultDatoFormat, this._timeZone), "day")
          ? acc.push({dato: dato, tidsrom: periode.datoer[dato]})
          : null
      );

      return acc;
    }, [] as DatoTidsrom[]).sort(
      (a: DatoTidsrom, b: DatoTidsrom) =>
        moment(a.dato, vars.defaultDatoFormat).isBefore(moment(b.dato, vars.defaultDatoFormat)) ? -1 : 1);
  };

  private isTimeInRange = (time: Moment, start: string, end: string, format: string): boolean => {
    return time.isBetween(
      moment.tz(start, format, this._timeZone),
      moment.tz(end, format, this._timeZone));
  }
}
