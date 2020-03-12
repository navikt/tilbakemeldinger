import { urls } from "../../Config";
import React from "react";
import { Normaltekst, Systemtittel, Undertekst } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";

const className = "korona-varsel";

export const KoronaVirusVarsel = () => (
  <LenkepanelBase className={className} href={urls.faq.koronavirus} border={true}>
    <div className={`${className}__ikon-rad`}>
      <div className={`${className}__pulse`}>
        <div className={`${className}__sirkel`}/>
      </div>
    </div>
    <div className={`${className}__tekst-rad`}>
      <Systemtittel className={`lenkepanel__heading ${className}__tittel`}>
        {"Koronavirus"}
      </Systemtittel>
      <Normaltekst className={`${className}__ingress`}>
        {"Her finner du oppdatert informasjon fra NAV om sykmeldinger, permitteringer og behov for akuttolk."}
      </Normaltekst>
      <Undertekst className={`${className}__dato-tid`}>
        {"Oppdatert: 13.03.2020, kl. 00.09"}
      </Undertekst>
    </div>
  </LenkepanelBase>
);
