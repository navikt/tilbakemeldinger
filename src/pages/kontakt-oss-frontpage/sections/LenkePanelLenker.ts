import Environment from "Environments";
import { urls } from "Config";

const { baseUrl } = Environment();

export default [
  {
    external: true,
    id: "tolketjenesten",
    tittel: "Kontakt tolketjenesten",
    beskrivelse: `Tolketjenesten i NAV dekker tolkeoppdrag for døve, døvblinde og hørselshemmede`,
    lenkeTekst: "Kontaktinformasjon for tolketjenesten i NAV i ditt fylke",
    url: `${baseUrl}/no/Person/Hjelpemidler/Tjenester+og+produkter/Tolketjenesten`
  },
  {
    external: true,
    id: "nav-kontor",
    tittel: "Finn ditt NAV-kontor",
    beskrivelse: `På NAV kontor kan du låne PC og printer, treffe din veileder for avtalt møte eller be om nødhjelp.`,
    lenkeTekst: "Finn adressen (du må logge inn)",
    url: `${baseUrl}/person/personopplysninger`
  },
  {
    id: "klage-og-tilbakemeldinger",
    tittel: "Klage og tilbakemeldinger",
    beskrivelse: `Du kan klage hvis du har fått helt eller delvis avslag på søknaden din, og hvis du har hatt en negativ opplevelse i møte med NAV`,
    lenkeTekst: "Slik går du frem for å klage",
    url: urls.tilbakemeldinger.forside
  }
];
