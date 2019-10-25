import Environment from "Environments";
import { urls } from "Config";

const { tjenesteUrl, baseUrl } = Environment();

export default [
  {
    type: "a",
    id: "tolketjenesten",
    tittel: "Kontakt tolketjenesten",
    beskrivelse: `Tolketjenesten i NAV dekker tolkeoppdrag for døve, døvblinde og hørselshemmede`,
    lenkeTekst: "Kontaktinformasjon for tolketjenesten i NAV i ditt fylke",
    url: `${tjenesteUrl}/utbetalingsoversikt`
  },
  {
    type: "a",
    id: "nav-kontor",
    tittel: "Finn ditt NAV-kontor",
    beskrivelse: `På NAV kontor kan du låne PC og printer, treffe din veileder for avtalt møte eller be om nødhjelp.`,
    lenkeTekst: "Finn adressen (du må logge inn)",
    url: `${baseUrl}/person/personopplysninger`
  },
  {
    type: "Link",
    id: "klage-og-tilbakemeldinger",
    tittel: "Klage og tilbakemeldinger",
    beskrivelse: `Du kan klage hvis du har fått helt eller delvis avslag på søknaden din, og hvis du har hatt en negativ opplevelse i møte med NAV`,
    lenkeTekst: "Slik går du frem for å klage",
    url: urls.tilbakemeldinger.forside
  },
  {
    type: "a",
    id: "feil-og-mangler",
    tittel: "Feil og mangler på nav.no",
    beskrivelse: `Prøv gjerne våre <a href="www.nav.no">fikse problemet selv</a>.
        Hvis det ikke hjelper, kan du <a href="www.nav.no">ringe oss</a>. Åpningstider er hverdager mellom 08:00-15:30 (torsdager 09:00-15:30). 
        Gi oss gjerne beskjed om du opplever <a href="www.nav.no">feil eller mangler på nav.no</a>`,
    lenkeTekst: "Meld fra om feil og manglerf",
    url: `${tjenesteUrl}/utbetalingsoversikt`
  },
  {
    type: "a",
    id: "sosiale-medier",
    tittel: "NAV i sosiale medier",
    beskrivelse: `Du treffer oss på <a href="www.nav.no">Facebook</a>, <a href="ww.nav.no">Twitter</a>,
        <a href="ww.nav.no">Linkedin</a>, <a href="ww.nav.no">Instagram</a>, <a href="ww.nav.no">Snapchat</a>
        og <a href="ww.nav.no">Youtube</a>`
  }
];
