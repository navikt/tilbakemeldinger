import veilderIcon from "assets/Veileder.svg";
import Environment from "Environments";

const { tjenesteUrl } = Environment();

export default [
  {
    id: "dine-saker",
    tittel: "Dine saker",
    beskrivelse: "I dine saker tatata ....",
    lenkeTekst: "Gå til dine saker",
    url: `${tjenesteUrl}/saksoversikt/app`,
    icon: veilderIcon
  },
  {
    id: "utbetalinger",
    tittel: "Utbetalinger",
    beskrivelse: "Dine utbetalinger er en tjeneste ...",
    lenkeTekst: "Gå til dine utbetalinger",
    url: `${tjenesteUrl}/utbetalingsoversikt`,
    icon: veilderIcon
  }
];
