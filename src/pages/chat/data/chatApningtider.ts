import ApningsTider from "../../../utils/apningstider";
import { AvviksPeriode, Ukedag } from "../../../types/datotid";
import { ChatTema } from "../../../types/kanaler";

const jobbSokerHelgeApent: AvviksPeriode[] = [
  {
    visFraDato: "12:00 26-03-2020",
    datoer: {
      "28-03-2020": {
        start: "09.00",
        end: "14.30"
      },
      "29-03-2020": {
        start: "09.00",
        end: "14.30"
      }
    }
  }
];

export const chatApningstider: {[key in ChatTema]: ApningsTider | null} = {
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
  }),
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
  }, jobbSokerHelgeApent),
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
  }),
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
  }),
  [ChatTema.Ufor]: new ApningsTider(
    {
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
    }),
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
  }),
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
  }),
  [ChatTema.EURES]: null
};
