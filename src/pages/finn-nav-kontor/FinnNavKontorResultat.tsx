import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import { minQueryLength, sanitizeQuery, SearchHit, SearchResult, SearchStatus } from "./FinnNavKontorSok";

const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");
const norskSort = new Intl.Collator(["no", "nb", "nn"], {usage: "sort"}).compare;

type KontorProps = {
  enhetsnr: number
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
  const kontorNavn = enhetsnrTilKontor[enhetsnr];
  const url = `${urls.navKontorSidePrefix}${urlifyKontorNavn(kontorNavn)}`;

  return (
    <RouterLenkeMedChevron href={url} isExternal={true} className={"finn-kontor__lenke"}>
      {kontorNavn}
    </RouterLenkeMedChevron>
  );
};

const sortByRelevance = (hits: Array<SearchHit>) => hits
    .sort((a, b) => norskSort(a.stedsnavn, b.stedsnavn))
    .sort((a, b) =>
      a.hitIndex === 0 ? (b.hitIndex === 0 && a.stedsnavn.length >= b.stedsnavn.length ? 0 : -1) : 0);

const sorterEnheterPaaKontornavn = (enhetsnrArray: Array<number>) => enhetsnrArray
  .filter(enhetsnr => {
    const kontorNavn = enhetsnrTilKontor[enhetsnr];
    if (kontorNavn) {
      return true;
    }
    console.log("Error: kontornavn ikke funnet for enhetsnr " + enhetsnr);
    return false;
  })
  .sort((a, b) => norskSort(enhetsnrTilKontor[a], enhetsnrTilKontor[b]))
  .reduce((acc: Array<number>, curr, index, arr) =>
    (index > 0 && enhetsnrTilKontor[arr[index - 1]] === enhetsnrTilKontor[arr[index]] ? acc : [...acc, curr]), []);

const VisAlle = () => {
  const kontorLenker = sorterEnheterPaaKontornavn(Object.keys(enhetsnrTilKontor).map(Number))
    .map(enhetsnr => <KontorLenke enhetsnr={enhetsnr} key={enhetsnr}/>);
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

const StedsnavnHit = (hit: SearchHit, len: number) => {
  const hitStart = hit.hitIndex || 0;
  const hitEnd = hitStart + len;
  const navn = hit.stedsnavn || "";

  const kontorLenker = sorterEnheterPaaKontornavn(hit.enhetsnr)
    .map(enhetsnr => <KontorLenke enhetsnr={enhetsnr} key={enhetsnr}/>);

  return (
    <>
      <Element className={"finnkontor-hit-stedsnavn"}>
        <span className={"finnkontor-hit-faded"}>{navn.slice(0, hitStart)}</span>
        <span className={"finnkontor-hit-uthevet"}>{navn.slice(hitStart, hitEnd)}</span>
        <span className={"finnkontor-hit-faded"}>{navn.slice(hitEnd)}</span>
      </Element>
      {kontorLenker}
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

  if (resultat.status === SearchStatus.postnrTreff) {
    return (
      <>
        <Normaltekst>
          <FormattedMessage id={"finnkontor.resultat.postnr"}/>
          <span className={"finnkontor-postnr"}>{resultat.query}</span>{":"}
        </Normaltekst>
        <div className={"finn-kontor__kontorliste"}>
          <KontorLenke enhetsnr={resultat.hits[0].enhetsnr[0]}/>
        </div>
      </>
    );
  }

  if (resultat.status === SearchStatus.stedsnavnTreff) {
    return (
      <>
        <Normaltekst>
          <FormattedMessage id={"finnkontor.resultat.stedsnavn"} values={{query: resultat.query, antall: resultat.hits.length}}/>
        </Normaltekst>
        <div className={"finn-kontor__kontorliste"}>
          {sortByRelevance(resultat.hits).map(hit => StedsnavnHit(hit, resultat.query.length))}
        </div>
      </>
    );
  }

  return null;
};
