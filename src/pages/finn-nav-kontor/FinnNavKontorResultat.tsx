import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import { minQueryLength, SearchHit, SearchResult, SearchStatus } from "./FinnNavKontorSok";

const enhetsnrTilEnhetsinfo = require("./enhetsnr-til-enhetsinfo.json");

const cssPrefix = "finn-kontor";

const maxAntallDynamiskeTreff = 10;

type KontorProps = {
  enhetsnr: number
};

type ResultProps = {
  resultat: SearchResult
};

type KontorInfo = {
  navn: string,
  url: string
};

const KontorLenke = ({enhetsnr}: KontorProps) => {
  const kontorInfo = enhetsnrTilEnhetsinfo[enhetsnr] as KontorInfo;
  const url = `${urls.navKontorSidePrefix}${kontorInfo.url}`;

  return (
    <RouterLenkeMedChevron href={url} isExternal={true} className={`${cssPrefix}__kontorlenke`}>
      {kontorInfo.navn}
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
    const antallTreff = resultat.hits.length;

    return (
      <div className={`${cssPrefix}__resultatliste`}>
        {resultat.hits.slice(0, maxAntallDynamiskeTreff).map(hit => stedsnavnTreff(hit, resultat.query.length))}
        {antallTreff > maxAntallDynamiskeTreff && (
          <div className={`${cssPrefix}__flere-treff`}>
            <FormattedMessage id={"finnkontor.flere.treff"} values={{antall: antallTreff}}/>
          </div>
        )}
      </div>
    );
  }

  return null;
};
