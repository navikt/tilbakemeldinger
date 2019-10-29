import { urls } from "Config";

export default [
  {
    external: true,
    id: "nav-kontor",
    tittel: "kontaktoss.navkontor.tittel",
    beskrivelse: `kontaktoss.navkontor.beskrivelse`,
    lenkeTekst: "kontaktoss.navkontor.knapp",
    url: urls.finnDittNavKontor
  },
  {
    id: "klage-og-tilbakemeldinger",
    tittel: "kontaktoss.klage.tittel",
    beskrivelse: `kontaktoss.klage.beskrivelse`,
    lenkeTekst: "kontaktoss.klage.knapp",
    url: urls.tilbakemeldinger.forside
  }
];
