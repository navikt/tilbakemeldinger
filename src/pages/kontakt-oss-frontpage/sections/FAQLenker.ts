export interface Lenke {
  lenke: string;
  lenkeTekst: string;
}

export const lenkerFAQ: Lenke[] = [
  {
    lenke: `https://www.nav.no/`,
    lenkeTekst: "Når kommer neste utbetaling?"
  },
  {
    lenke: `https://www.nav.no/`,
    lenkeTekst: "Hvordan kan jeg få post fra NAV til en annen adresse?"
  },
  {
    lenke: `https://www.nav.no/`,
    lenkeTekst: "Hvilke saksbehandlingstider gjelder i mitt fylke?"
  }
];

export const lenkerMinSide: Lenke[] = [
  {
    lenke: `https://www.nav.no/`,
    lenkeTekst: "Endre kontonummer"
  },
  {
    lenke: `https://www.nav.no/`,
    lenkeTekst: "Se dine utbetalinger og skattetrekk"
  },
  {
    lenke: `https://www.nav.no/`,
    lenkeTekst: "Se status i saken min"
  }
];
