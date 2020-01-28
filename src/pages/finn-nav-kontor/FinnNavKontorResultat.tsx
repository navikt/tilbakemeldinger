import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import { minQueryLength, sanitizeQuery, SearchHit, SearchResult, SearchStatus } from "./FinnNavKontorSok";

const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");

const cssPrefix = "finn-kontor";

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
    <RouterLenkeMedChevron href={url} isExternal={true} className={`${cssPrefix}__kontorlenke`}>
      {kontorNavn}
    </RouterLenkeMedChevron>
  );
};

const stedsnavnTreff = (hit: SearchHit, len: number) => {
  const hitStart = hit.hitIndex || 0;
  const hitEnd = hitStart + len;
  const navn = hit.treffnavn || "";

  const kontorLenker = hit.enhetsnr
    .map(enhetsnr => <KontorLenke enhetsnr={enhetsnr} key={enhetsnr}/>);

  return (
    <div className={`${cssPrefix}__resultat`} key={navn}>
      <Element>
        <span className={`${cssPrefix}__treff-faded`}>{navn.slice(0, hitStart)}</span>
        <span className={`${cssPrefix}__treff-uthevet`}>{navn.slice(hitStart, hitEnd)}</span>
        <span className={`${cssPrefix}__treff-faded`}>{navn.slice(hitEnd)}</span>
      </Element>
      <div className={`${cssPrefix}__kontorliste`}>
        {kontorLenker}
      </div>
    </div>
  );
};

const postnrTreff = ({enhetsnr, treffnavn}: SearchHit) => (
  <div className={`${cssPrefix}__resultat`}>
    <Normaltekst>
      <FormattedMessage id={"finnkontor.resultat.postnr"}/>
      <span className={`${cssPrefix}__treff-uthevet`}>{treffnavn}</span><span>{":"}</span>
    </Normaltekst>
    <div className={`${cssPrefix}__kontorliste`}>
      <KontorLenke enhetsnr={enhetsnr[0]}/>
    </div>
  </div>
);

export const FinnNavKontorResultat = ({resultat}: ResultProps) => {
  if (resultat.status === SearchStatus.QueryFeil) {
    return <FormattedMessage id={"finnkontor.query.feil"} values={{min: minQueryLength}}/>;
  }

  if (resultat.status === SearchStatus.UgyldigPostnr) {
    return <FormattedMessage id={"finnkontor.ugyldig.postnr"} values={{nummer: resultat.query}}/>;
  }

  if (resultat.status === SearchStatus.IngenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  if (resultat.status === SearchStatus.PostnrTreff) {
    return postnrTreff(resultat.hits[0]);
  }

  if (resultat.status === SearchStatus.StedsnavnTreff) {
    return (
      <>
        <Normaltekst>
          <FormattedMessage id={"finnkontor.resultat.stedsnavn"} values={{query: resultat.query, antall: resultat.hits.length}}/>
        </Normaltekst>
        <div className={`${cssPrefix}__resultatliste`}>
          {resultat.hits.map(hit => stedsnavnTreff(hit, resultat.query.length))}
        </div>
      </>
    );
  }

  return null;
};

export const FinnNavKontorResultatDynamisk = ({resultat}: ResultProps) => {
  if (resultat.status === SearchStatus.UgyldigPostnr || resultat.status === SearchStatus.IngenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  if (resultat.status === SearchStatus.QueryFeil) {
    return <FormattedMessage id={"finnkontor.query.feil.kort"} values={{min: minQueryLength}}/>;
  }

  if (resultat.status === SearchStatus.PostnrTreff) {
    return postnrTreff(resultat.hits[0]);
  }

  if (resultat.status === SearchStatus.StedsnavnTreff) {
    return (
      <div className={`${cssPrefix}__resultatliste`}>
        {resultat.hits.map(hit => stedsnavnTreff(hit, resultat.query.length))}
      </div>
    );
  }

  return null;
};
