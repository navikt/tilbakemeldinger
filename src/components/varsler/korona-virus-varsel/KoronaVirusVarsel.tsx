import Config from "../../../Config";
import React from "react";
import { Normaltekst, Undertekst, Undertittel } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";

const className = "korona-varsel";

export type KoronaVirusVarselInnhold = {
  tittel: JSX.Element,
  ingress?: JSX.Element,
  datoTid?: string,
  href: string,
};

type Props = {
  innhold?: KoronaVirusVarselInnhold
};

const defaultInnhold: KoronaVirusVarselInnhold = {
  tittel: <>{"Koronavirus - hva gjelder i min situasjon?"}</>,
  href: Config.urls.koronaVarsel,
};

export const KoronaVirusVarsel = ({ innhold = defaultInnhold }: Props) => (
  <LenkepanelBase className={`${className} varsel-panel`} href={innhold.href} border={true}>
    <div className={`${className}__ikon-kol`}>
      <div className={`${className}__pulse`}/>
      <div className={`${className}__sirkel`}/>
    </div>
    <div className={`${className}__tekst-kol`}>
      <Undertittel className={`lenkepanel__heading`}>
        {innhold.tittel}
      </Undertittel>
      {innhold.ingress && (
        <Normaltekst className={`${className}__ingress`}>
          {innhold.ingress}
        </Normaltekst>
      )}
      {innhold.datoTid && (
        <Undertekst className={`${className}__dato-tid`}>
          {`Oppdatert: ${innhold.datoTid}`}
        </Undertekst>
      )}
    </div>
  </LenkepanelBase>
);
