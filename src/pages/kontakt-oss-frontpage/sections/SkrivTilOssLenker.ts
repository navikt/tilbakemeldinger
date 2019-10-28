import { urls } from "Config";

export interface Lenke {
  external?: boolean;
  lenke: string;
  lenkeTekst: string;
  beskrivelse: string;
}

export const lenker: Lenke[] = [
  {
    external: true,
    lenke: "https://www.nav.no",
    lenkeTekst: `Chat`,
    beskrivelse: `På chat kan vi ikke svare på saken din, men vi hjelper deg gjerne med generelle spørsmål.`
  },
  {
    lenkeTekst: ` Skriv til oss`,
    lenke: urls.skrivTilOss.forside,
    beskrivelse: `Du kan ikke sende e-post til oss, men du kan sende spørsmål om saken din
        eller opplysninger til oss ved å logge inn og skrive til oss. Du får
        svar etter <b>omtrent 2 arbeidsdager</b>.`
  },
  {
    external: true,
    lenke: "https://www.nav.no",
    lenkeTekst: `Kontakt din veileder via aktivitetsplanen`,
    beskrivelse: `Du har en aktivietsplan dersom du er <a class="lenke" href="www.nav.no">registrert som arbeidssøker</a>. 
        Da kan du kontakte din veileder og be om et møte eller råd under jobbsøkerprosessen. 
        Svartiden varirerer.`
  }
];