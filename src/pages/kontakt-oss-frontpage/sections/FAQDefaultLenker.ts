import { urls } from "../../../Config";
import { FAQLenke } from "../../../utils/sanity/endpoints/faq";
import { Language } from "../../../utils/sanity/serializers";

export const lenkerFAQDefault: FAQLenke[] = [
  {
    lenke: {[Language.Bokmaal]: urls.faqDefault.utbetalingsoversikt},
    tittel: {[Language.Bokmaal]: "faq.utbetalingsoversikt"},
    priority: 0
  },
  {
    lenke: {[Language.Bokmaal]: urls.faqDefault.saksoversikt},
    tittel: {[Language.Bokmaal]: "faq.saksoversikt"},
    priority: 0
  },
  {
    lenke: {[Language.Bokmaal]: urls.faqDefault.utbetalinger},
    tittel: {[Language.Bokmaal]: "faq.nesteutbetaling"},
    priority: 0
  },
  {
    lenke: {[Language.Bokmaal]: urls.faqDefault.saksbehandlingstider},
    tittel: {[Language.Bokmaal]: "faq.saksbehandlingstider"},
    priority: 0
  },
  {
    lenke: {[Language.Bokmaal]: urls.faqDefault.endreKontonummer},
    tittel: {[Language.Bokmaal]: "faq.endrekontonummer"},
    priority: 0
  },
  {
    lenke: {[Language.Bokmaal]: urls.faqDefault.postTilAnnenAdresse},
    tittel: {[Language.Bokmaal]: "faq.posttilannenadresse"},
    priority: 0
  },
];
