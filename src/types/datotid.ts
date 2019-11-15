
enum Ukedager {
  Mandag = "mandag",
  Tirsdag = "tirsdag",
  Onsdag = "onsdag",
  Torsdag = "torsdag",
  Fredag = "fredag",
  Lordag = "lørdag",
  Sondag = "søndag",
}

export type ApningsTider = {[key in Ukedager]: {
  start: Date,
  end: Date,
}};
