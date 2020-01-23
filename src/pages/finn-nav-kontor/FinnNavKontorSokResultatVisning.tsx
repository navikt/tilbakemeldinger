import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import {sanitizeQuery} from "./FinnNavKontorSok";

const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");

type KontorProps = {
  enhetsnr: string
};

type ResultProps = {
  result: Array<string>,
  query: string
};

const urlifyKontorNavn = (navn: string) => sanitizeQuery(navn)
  .replace(/æ/g, "ae")
  .replace(/ø/g, "o")
  .replace(/å/g, "a")
  .replace("valer-(innlandet)", "valer-i-hedmark")
  .replace("valer-(viken)", "valer")
  .replace(/porsanger.+/, "porsanger")
  .replace(/salangen.+/, "salangen")
  .replace("balsfjord-og-storfjord", "balsfjord-storfjord")
  .replace("bo-(nordland)", "bo")
  .replace("-aremark", "")
  .replace("vest-telemark", "tokke");

const KontorLenke = ({enhetsnr}: KontorProps) => {
  const kontorNavn = enhetsnrTilKontor[parseInt(enhetsnr, 10)];
  const url = `${urls.navKontorSidePrefix}${urlifyKontorNavn(kontorNavn)}`;

  return (
    <RouterLenkeMedChevron href={url} isExternal={true} className={"finn-kontor__lenke"}>
      {kontorNavn}
    </RouterLenkeMedChevron>
  );
};

const sortertKontorListe = (enhetsnrArray: Array<string>) => enhetsnrArray
  .filter(enhetsnr => {
    const kontorNavn = enhetsnrTilKontor[enhetsnr];
    if (kontorNavn) {
      return true;
    }
    console.log("Error: kontornavn ikke funnet for enhetsnr " + enhetsnr);
    return false;
  })
  .sort((a, b) => enhetsnrTilKontor[a].localeCompare(enhetsnrTilKontor[b]))
  .reduce((acc: Array<string>, curr, index, arr) =>
    (index > 0 && enhetsnrTilKontor[arr[index-1]] === enhetsnrTilKontor[arr[index]] ? acc : [...acc, curr]), [])
  .map(enhetsnr => <KontorLenke enhetsnr={enhetsnr} key={enhetsnr}/>);

const VisAlle = () => {
  const kontorLenker = sortertKontorListe(Object.keys(enhetsnrTilKontor));
  return (
    <>
      <Normaltekst>
        <FormattedMessage id={"finnkontor.visalle"} values={{antall: Object.keys(enhetsnrTilKontor).length}} />
      </Normaltekst>
      <div className={"finn-kontor__kontorliste"}>
        {kontorLenker}
      </div>
    </>
  );
};

export const FinnNavKontorSokResultatVisning = ({result, query}: ResultProps) => {
  if (query === ":visalle") {
    return <VisAlle/>;
  }

  if (!result || result.length === 0) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query}} />;
  }

  const kontorLenker = sortertKontorListe(result);

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
