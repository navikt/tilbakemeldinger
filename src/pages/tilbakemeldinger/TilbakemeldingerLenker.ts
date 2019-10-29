import { urls } from "../../Config";

export interface Lenke {
  tittel: string;
  beskrivelse: string;
  lenke: string;
  lenkeTekst: string;
  external?: boolean;
}

export const lenker: Lenke[] = [
  {
    tittel: "tilbakemeldinger.klageanke.tittel",
    beskrivelse: "tilbakemeldinger.klageanke.tittel",
    lenke: urls.tilbakemeldinger.klagepavedtak,
    lenkeTekst: "tilbakemeldinger.klageanke.link",
    external: true
  },
  {
    tittel: "tilbakemeldinger.serviceklage.tittel",
    beskrivelse: "tilbakemeldinger.serviceklage.beskrivelse",
    lenke: urls.tilbakemeldinger.serviceklage.login,
    lenkeTekst: "tilbakemeldinger.serviceklage.link"
  },
  {
    tittel: "tilbakemeldinger.feilogmangler.tittel",
    beskrivelse: "tilbakemeldinger.feilogmangler.beskrivelse",
    lenke: urls.tilbakemeldinger.feilogmangler,
    lenkeTekst: "tilbakemeldinger.feilogmangler.link"
  },
  {
    tittel: "tilbakemeldinger.ros.tittel",
    beskrivelse: "tilbakemeldinger.ros.beskrivelse",
    lenke: urls.tilbakemeldinger.rostilnav,
    lenkeTekst: "tilbakemeldinger.feilogmangler.link"
  }
];
