import veilderIcon from "assets/Veileder.svg";
import Environment from "Environments";
import { urls } from "Config";

const { tjenesteUrl } = Environment();

export default [
  {
    type: "Link",
    id: "klage-og-tilbakemeldinger",
    tittel: "Klage og tilbakemeldinger",
    beskrivelse: `Du kan klage hvis du har fått helt eller delvis avslag på søknaden din, og hvis du har hatt en negativ opplevelse i møte med NAV`,
    lenkeTekst: "Slik går du frem for å klage",
    url: urls.tilbakemeldinger.forside,
    icon: veilderIcon
  },
  {
    type: "a",
    id: "utbetalinger",
    tittel: "Mauris lacus ligula",
    beskrivelse: `Praesent eget maximus lacus. Integer posuere efficitur dui eget sagittis.`,
    lenkeTekst: "Curabitur malesuada fermentum",
    url: `${tjenesteUrl}/utbetalingsoversikt`,
    icon: veilderIcon
  }
];
