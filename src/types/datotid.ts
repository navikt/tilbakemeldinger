
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

export type ApningsTider = {[key in Ukedager]: {
  start: string,
  end: string,
} | null};
