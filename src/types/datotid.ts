
// Følger moment.js index for ukedager
export enum Ukedager {
  Sondag = 0,
  Mandag,
  Tirsdag,
  Onsdag,
  Torsdag,
  Fredag,
  Lordag,
}

export type DatoTidsrom = {
  dato: string,
  tidsrom: Tidsrom
};

export type Tidsrom = {
  start: string,
  end: string,
} | null;

export type AvviksPeriode = {
  visFraDato: string,
  datoer: {[dato: string]: Tidsrom},
};

export type ApningstiderUke = {
  [dag in Ukedager]: Tidsrom
};
