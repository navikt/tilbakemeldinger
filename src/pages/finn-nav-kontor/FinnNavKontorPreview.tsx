import { SearchResult, SearchStatus } from "./FinnNavKontorSok";
import { FormattedMessage } from "react-intl";
import React from "react";
import { sorterEnhetsnrPaaKontornavn, urlifyKontorNavn } from "./FinnNavKontorResultat";
import RouterLenke from "../../components/routerlenke/RouterLenke";
import { urls } from "../../Config";

const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");

type Props = {
  resultat: SearchResult
};

type KontorProps = {
  enhetsnr: string
};

const KontorLenkePreview = ({enhetsnr}: KontorProps) => {
  const kontorNavn = enhetsnrTilKontor[parseInt(enhetsnr, 10)];
  const url = `${urls.navKontorSidePrefix}${urlifyKontorNavn(kontorNavn)}`;

  return (
    <RouterLenke href={url} isExternal={true} className={"finn-kontor__lenke"}>
      {kontorNavn}
    </RouterLenke>
  );
};

export const FinnNavKontorPreview = ({resultat}: Props) => {
  if (resultat.status === SearchStatus.ingenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  if (resultat.status === SearchStatus.stedsnavnTreff) {
    const kontorLenker = sorterEnhetsnrPaaKontornavn(resultat.hits)
      .map(enhetsnr => <KontorLenkePreview enhetsnr={enhetsnr} key={enhetsnr}/>);

    return (
      <>
        <div className={"finn-kontor__kontorliste"}>
          {kontorLenker}
        </div>
      </>
    );
  }

  return null;
};