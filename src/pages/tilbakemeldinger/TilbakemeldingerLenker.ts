export interface Lenke {
  tittel: string;
  beskrivelse: string;
  lenke: string;
  lenkeTekst: string;
  external?: boolean;
}

export const lenker: Lenke[] = [
  {
    tittel: "Klage eller anke på vedtak",
    beskrivelse:
      "Har du fått helt eller delvis avslag på søknaden din, kan du klage på avslaget. Får du ikke medhold i klagen din i NAV, kan du med noen unntak anke til Trygderetten. ",
    lenke:
      "https://www.nav.no/no/Person/Skjemaer-for-privatpersoner/klage-pa-vedtak",
    lenkeTekst: "Send klage eller anke på vedtak",
    external: true
  },
  {
    tittel: "Klage på service",
    beskrivelse:
      "Har du blitt møtt på en dårlig måte? Eller hatt en annen negativ opplevelse i møte med NAV?",
    lenke: "/person/kontakt-oss/tilbakemeldinger/serviceklage/login",
    lenkeTekst: "Send tilbakemelding på service"
  },
  {
    tittel: "Feil og mangler på nav.no",
    beskrivelse:
      "Har du oppdaget en feil på nav.no? Kanskje en teknisk feil, feil informasjon eller for lav grad av universell utforming? " +
      "Da vil vi gjerne høre fra deg. ",
    lenke: "/person/kontakt-oss/tilbakemeldinger/feil-og-mangler",
    lenkeTekst: "Meld fra om feil og mangler"
  },
  {
    tittel: "Ros til NAV",
    beskrivelse:
      "Har du en god opplevelse? Vil du rose en medarbeider, eller er det noe annet positivt du vil dele med NAV?",
    lenke: "/person/kontakt-oss/tilbakemeldinger/ros-til-nav",
    lenkeTekst: "Gi ros til nav"
  }
];
