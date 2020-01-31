import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import { minQueryLength, SokeTreff, SokeResultat, SokeStatus } from "./FinnNavKontorSok";

const enhetsnrTilEnhetsinfo = require("./enhetsnr-til-enhetsinfo.json");

const cssPrefix = "finn-kontor";

const maxAntallDynamiskeTreffVisning = 10;

type KontorProps = {
  enhetsnr: number
};

type ResultProps = {
  resultat: SokeResultat
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

const stedsnavnTreff = (treff: SokeTreff, len: number) => {
  const treffStart = treff.treffIndex || 0;
  const treffSlutt = treffStart + len;
  const navn = treff.treffString || "";

  const kontorLenker = treff.enhetsnrArray
    .map(enhetsnr => <KontorLenke enhetsnr={enhetsnr} key={enhetsnr}/>);

  return (
    <div className={`${cssPrefix}__resultat`} key={navn}>
      <Element>
        <span className={`${cssPrefix}__treff-faded`}>{navn.slice(0, treffStart)}</span>
        <span className={`${cssPrefix}__treff-uthevet`}>{navn.slice(treffStart, treffSlutt)}</span>
        <span className={`${cssPrefix}__treff-faded`}>{navn.slice(treffSlutt)}</span>
      </Element>
      <div className={`${cssPrefix}__kontorliste`}>
        {kontorLenker}
      </div>
    </div>
  );
};

const postnrTreff = ({enhetsnrArray, treffString}: SokeTreff) => (
  <div className={`${cssPrefix}__resultat`}>
    <Normaltekst>
      <FormattedMessage id={"finnkontor.resultat.postnr"}/>
      <span className={`${cssPrefix}__treff-uthevet`}>{treffString}</span><span>{":"}</span>
    </Normaltekst>
    <div className={`${cssPrefix}__kontorliste`}>
      <KontorLenke enhetsnr={enhetsnrArray[0]}/>
    </div>
  </div>
);

export const FinnNavKontorResultat = ({resultat}: ResultProps) => {
  if (resultat.status === SokeStatus.QueryFeil) {
    return <FormattedMessage id={"finnkontor.query.feil"} values={{min: minQueryLength}}/>;
  }

  if (resultat.status === SokeStatus.UgyldigPostnr) {
    return <FormattedMessage id={"finnkontor.ugyldig.postnr"} values={{nummer: resultat.query}}/>;
  }

  if (resultat.status === SokeStatus.IngenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  if (resultat.status === SokeStatus.PostnrTreff) {
    return postnrTreff(resultat.treffArray[0]);
  }

  if (resultat.status === SokeStatus.StedsnavnTreff) {
    return (
      <>
        <Normaltekst>
          <FormattedMessage id={"finnkontor.resultat.stedsnavn"} values={{query: resultat.query, antall: resultat.treffArray.length}}/>
        </Normaltekst>
        <div className={`${cssPrefix}__resultatliste`}>
          {resultat.treffArray.map(hit => stedsnavnTreff(hit, resultat.query.length))}
        </div>
      </>
    );
  }

  return null;
};

export const FinnNavKontorResultatDynamisk = ({resultat}: ResultProps) => {
  if (resultat.status === SokeStatus.UgyldigPostnr || resultat.status === SokeStatus.IngenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  if (resultat.status === SokeStatus.QueryFeil) {
    return <FormattedMessage id={"finnkontor.query.feil.kort"} values={{min: minQueryLength}}/>;
  }

  if (resultat.status === SokeStatus.PostnrTreff) {
    return postnrTreff(resultat.treffArray[0]);
  }

  if (resultat.status === SokeStatus.StedsnavnTreff) {
    const antallTreff = resultat.treffArray.length;

    return (
      <div className={`${cssPrefix}__resultatliste`}>
        {resultat.treffArray.slice(0, maxAntallDynamiskeTreffVisning).map(hit => stedsnavnTreff(hit, resultat.query.length))}
        {antallTreff > maxAntallDynamiskeTreffVisning && (
          <div className={`${cssPrefix}__flere-treff`}>
            <FormattedMessage id={"finnkontor.flere.treff"} values={{antall: antallTreff}}/>
          </div>
        )}
      </div>
    );
  }

  return null;
};
