import { urls } from "../../../Config";

export interface Lenke {
  lenke: string;
  lenkeTekst: string;
}

export const lenkerFAQ: Lenke[] = [
  {
    lenke: urls.faq.koronavirus,
    lenkeTekst: "faq.koronavirus"
  },
  {
    lenke: urls.faq.utbetalingsoversikt,
    lenkeTekst: "faq.utbetalingsoversikt"
  },
  {
    lenke: urls.faq.saksoversikt,
    lenkeTekst: "faq.saksoversikt"
  },
  {
    lenke: urls.faq.eosReglerSak,
    lenkeTekst: "faq.eosreglersak",
  },
  {
    lenke: urls.faq.utbetalinger,
    lenkeTekst: "faq.nesteutbetaling"
  },
  {
    lenke: urls.faq.saksbehandlingstider,
    lenkeTekst: "faq.saksbehandlingstider"
  },
  {
    lenke: urls.faq.endreKontonummer,
    lenkeTekst: "faq.endrekontonummer"
  },
  {
    lenke: urls.faq.postTilAnnenAdresse,
    lenkeTekst: "faq.posttilannenadresse"
  },
];
