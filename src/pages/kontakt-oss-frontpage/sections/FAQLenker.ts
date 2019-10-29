import { urls } from "../../../Config";

export interface Lenke {
  lenke: string;
  lenkeTekst: string;
}

export const lenkerFAQ: Lenke[] = [
  {
    lenke: urls.faq.utbetalinger,
    lenkeTekst: "Når kommer neste utbetaling?"
  },
  {
    lenke: urls.faq.postTilAnnenAdresse,
    lenkeTekst: "Hvordan kan jeg få post fra NAV til en annen adresse?"
  },
  {
    lenke: urls.faq.saksbehandlingstider,
    lenkeTekst: "Hvilke saksbehandlingstider gjelder i mitt fylke?"
  }
];

export const lenkerMinSide: Lenke[] = [
  {
    lenke: urls.faq.endreKontonummer,
    lenkeTekst: "Endre kontonummer"
  },
  {
    lenke: urls.faq.utbetalingsoversikt,
    lenkeTekst: "Se dine utbetalinger og skattetrekk"
  },
  {
    lenke: urls.faq.saksoversikt,
    lenkeTekst: "Se status i saken min"
  }
];
