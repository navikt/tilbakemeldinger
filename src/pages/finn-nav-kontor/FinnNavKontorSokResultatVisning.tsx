import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import {sanitizeQuery} from "./FinnNavKontorSok";

const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");

type KontorProps = {
  enhetsnr: number
};

type ResultProps = {
  result: Array<number>,
  query: string
};

const urlifyKontorNavn = (navn: string) => sanitizeQuery(navn)
  .replace(/æ/g, "ae")
  .replace(/ø/g, "o")
  .replace(/å/g, "a")
  .replace("valer-(innlandet)", "valer-i-hedmark")
  .replace("valer-(ost-viken)", "valer");

const KontorLenke = ({enhetsnr}: KontorProps) => {
  const kontorNavn = enhetsnr && enhetsnrTilKontor[enhetsnr];
  if (!kontorNavn) {
    return <FormattedMessage id={"finnkontor.feil1"} />;
  }

  const url = `${urls.navKontorSidePrefix}${urlifyKontorNavn(kontorNavn)}`;

  return (
    <RouterLenkeMedChevron href={url} isExternal={true} className={"finn-kontor__lenke"}>
      {kontorNavn}
    </RouterLenkeMedChevron>
  );
};

export const FinnNavKontorSokResultatVisning = ({result, query}: ResultProps) => {
  if (!result || result.length === 0) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query}} />;
  }

  const kontorLenker = result.map(enhetsnr => <KontorLenke enhetsnr={enhetsnr} key={enhetsnr}/>);

  return (
    <>
      <Normaltekst>
        <FormattedMessage id={"finnkontor.resultat"} values={{query: query, antall: result.length}} />
      </Normaltekst>
      <div className={"finn-kontor__kontorliste"}>
        {kontorLenker}
      </div>
    </>
  );
};
