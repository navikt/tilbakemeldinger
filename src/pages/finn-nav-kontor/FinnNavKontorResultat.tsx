import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import { minQueryLength, sanitizeQuery, SearchResult, SearchStatus } from "./FinnNavKontorSok";

const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");
const norskSort = new Intl.Collator(["no", "nb", "nn"], {usage: "sort"}).compare;

type KontorProps = {
  enhetsnr: string
};

type ResultProps = {
  resultat: SearchResult
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
  .replace("vest-telemark", "tokke")
  .replace(/leka|bindal|naeroysund/, "naeroy")
  .replace("fensfjorden", "masfjorden")
  .replace("hallingdal", "halllingdal")
  .replace("lindesnes", "mandal")
  .replace("ullensvang", "odda")
  .replace("sorreisa", "senja")
  .replace(/sirdal|farsund|flekkefjord|lyngdal/, "kvinesdal")
  .replace("rindal", "orkland")
  .replace(/flatanger|overhalla/, "namsos")
  .replace(/^nav-nes$/, "nav-nes-i-akershus");

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
  .sort((a, b) => norskSort(enhetsnrTilKontor[a], enhetsnrTilKontor[b]))
  .reduce((acc: Array<string>, curr, index, arr) =>
    (index > 0 && enhetsnrTilKontor[arr[index - 1]] === enhetsnrTilKontor[arr[index]] ? acc : [...acc, curr]), [])
  .map(enhetsnr => <KontorLenke enhetsnr={enhetsnr} key={enhetsnr}/>);

const VisAlle = () => {
  const kontorLenker = sortertKontorListe(Object.keys(enhetsnrTilKontor));
  return (
    <>
      <Normaltekst>
        <FormattedMessage id={"finnkontor.visalle"} values={{antall: kontorLenker.length}}/>
      </Normaltekst>
      <div className={"finn-kontor__kontorliste"}>
        {kontorLenker}
      </div>
    </>
  );
};

export const FinnNavKontorResultat = ({resultat}: ResultProps) => {
  if (resultat.status === SearchStatus.visAlle) {
    return <VisAlle/>;
  }

  if (resultat.status === SearchStatus.queryFeil) {
    return <FormattedMessage id={"finnkontor.query.feil"} values={{min: minQueryLength}}/>;
  }

  if (resultat.status === SearchStatus.ugyldigPostnr) {
    return <FormattedMessage id={"finnkontor.ugyldig.postnr"} values={{nummer: resultat.query}}/>;
  }

  if (resultat.status === SearchStatus.ingenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  const kontorLenker = sortertKontorListe(resultat.hits);

  return (
    <>
      <Normaltekst>
        <FormattedMessage id={"finnkontor.resultat"} values={{query: resultat.query, antall: resultat.hits.length}}/>
      </Normaltekst>
      <div className={"finn-kontor__kontorliste"}>
        {kontorLenker}
      </div>
    </>
  );
};
