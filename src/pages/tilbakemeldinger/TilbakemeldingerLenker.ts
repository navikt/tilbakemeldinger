import { urls } from "../../Config";
import heartIcon from "assets/icons/line/line-version-logo-heart.svg";
import paperIcon from "assets/icons/line/line-version-logo-paper.svg";
import complaintIcon from "assets/icons/line/line-version-logo-complaint.svg";
import wrenchIcon from "assets/icons/line/line-version-logo-wrench.svg";

export interface Lenke {
  tittel: string;
  beskrivelse: string;
  lenke: string;
  lenkeTekst: string;
  icon?: string;
  external?: boolean;
}

export const lenker: Lenke[] = [
  {
    icon: paperIcon,
    tittel: "tilbakemeldinger.klageanke.tittel",
    beskrivelse: "tilbakemeldinger.klageanke.beskrivelse",
    lenke: urls.tilbakemeldinger.klagepavedtak,
    lenkeTekst: "tilbakemeldinger.klageanke.link",
    external: true
  },
  {
    icon: complaintIcon,
    tittel: "tilbakemeldinger.serviceklage.tittel",
    beskrivelse: "tilbakemeldinger.serviceklage.beskrivelse",
    lenke: urls.tilbakemeldinger.serviceklage.login,
    lenkeTekst: "tilbakemeldinger.serviceklage.link"
  },
  {
    icon: wrenchIcon,
    tittel: "tilbakemeldinger.feilogmangler.tittel",
    beskrivelse: "tilbakemeldinger.feilogmangler.beskrivelse",
    lenke: urls.tilbakemeldinger.feilogmangler,
    lenkeTekst: "tilbakemeldinger.feilogmangler.link"
  },
  {
    icon: heartIcon,
    tittel: "tilbakemeldinger.ros.tittel",
    beskrivelse: "tilbakemeldinger.ros.beskrivelse",
    lenke: urls.tilbakemeldinger.rostilnav,
    lenkeTekst: "tilbakemeldinger.ros.link"
  }
];
