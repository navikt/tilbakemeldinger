import ApningsTider from "../../../utils/apningstider";
import { AvviksPeriode, Ukedag } from "../../../types/datotid";
import { ChatTema } from "../../../types/kanaler";

const paske2020: AvviksPeriode = {
  visFraDato: "12:00 02-04-2020",
  datoer: {
    "08-04-2020": {
      start: "09.00",
      end: "12.00"
    },
    "09-04-2020": null,
    "10-04-2020": null,
    "13-04-2020": null,
  }
};

export const chatApningstider: { [key in ChatTema]: ApningsTider | null } = {
  [ChatTema.Arbeidsgiver]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [paske2020]),
  [ChatTema.Jobbsoker]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [paske2020]),
  [ChatTema.Syk]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [paske2020]),
  [ChatTema.Familie]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [paske2020]),
  [ChatTema.Ufor]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [paske2020]),
  [ChatTema.Sosial]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Tirsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Onsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Torsdag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "09.00",
      end: "14.30"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [paske2020]),
  [ChatTema.Okonomi]: new ApningsTider({
    [Ukedag.Mandag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Tirsdag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Onsdag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Torsdag]: {
      start: "10.00",
      end: "14.30"
    },
    [Ukedag.Fredag]: {
      start: "10.00",
      end: "15.00"
    },
    [Ukedag.Lordag]: null,
    [Ukedag.Sondag]: null
  }, [{
    ...paske2020,
    datoer:
      {
        ...paske2020.datoer,
        "08-04-2020": { start: "10:00", end: "12:00" }
      }
  }]),
  [ChatTema.EURES]: null
};
