import { Element, Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React, { useEffect, useRef, useState } from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";
import { minQueryLength, SokeTreff, SokeResultat, SokeStatus } from "./FinnNavKontorSok";
import Lenke from "nav-frontend-lenker";

const enhetsnrTilEnhetsinfo = require("./enhetsnr-til-enhetsinfo.json");

const cssPrefix = "finn-kontor";

const maxAntallDynamiskeTreffVisning = 10;

type KontorProps = {
  enhetsnr: number,
  lenkeIndex: number | null
};

type ResultProps = {
  resultat: SokeResultat
};

type KontorInfo = {
  navn: string,
  url: string
};

const KontorLenke = ({enhetsnr, lenkeIndex}: KontorProps) => {
  const kontorInfo = enhetsnrTilEnhetsinfo[enhetsnr] as KontorInfo;
  const url = `${urls.navKontorSidePrefix}${kontorInfo.url}`;

  return (
    <RouterLenkeMedChevron
      href={url}
      isExternal={true}
      className={`${cssPrefix}__kontorlenke`}
      id={lenkeIndex !== null ? `kontor-id-${lenkeIndex}` : ""}
    >
      {kontorInfo.navn}
    </RouterLenkeMedChevron>
  );
};

const stedsnavnTreff = (treff: SokeTreff, query: string, lenkeIndexStart: number|null) => {
  const treffStart = treff.treffIndex || 0;
  const treffSlutt = treffStart + query.length;
  const navn = treff.treffString;

  const kontorLenker = treff.enhetsnrArray
    .map((enhetsnr, index) => (
      <KontorLenke
        enhetsnr={enhetsnr}
        key={enhetsnr}
        lenkeIndex={lenkeIndexStart !== null ? lenkeIndexStart + index : null}
      />
    ));

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
      <KontorLenke enhetsnr={enhetsnrArray[0]} lenkeIndex={0}/>
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
          <FormattedMessage
            id={"finnkontor.resultat.stedsnavn"}
            values={{query: resultat.query, antall: resultat.treffArray.length}}
          />
        </Normaltekst>
        <div className={`${cssPrefix}__resultatliste`}>
          {resultat.treffArray.map(hit => stedsnavnTreff(hit, resultat.query, null))}
        </div>
      </>
    );
  }

  return null;
};

export const FinnNavKontorResultatDynamisk = ({resultat}: ResultProps) => {
  const getAntallVisteKontorer = () => resultatRef.current.treffArray
    .slice(0, maxAntallDynamiskeTreffVisning)
    .reduce((counter, treff) => counter + treff.enhetsnrArray.length, 0);

  const focusElement = (element: HTMLElement) => {
    const parent = document.getElementById("preview-container-id");
    element.focus();
    parent && parent.scrollTo(0, element.offsetTop - parent.offsetHeight / 3);
  };

  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setKontorValg(Math.max(kontorValgRef.current - 1, -1));
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const antallVisteKontorer = getAntallVisteKontorer();
      const maxValue = resultatRef.current.treffArray.length > maxAntallDynamiskeTreffVisning
          ? antallVisteKontorer
          : antallVisteKontorer - 1;
      setKontorValg(Math.min(kontorValgRef.current + 1, maxValue));
    } else {
      return;
    }

    const valgtElement = document.getElementById(`kontor-id-${kontorValgRef.current}`)
      || document.getElementById(kontorValgRef.current === -1 ? "finn-kontor-input-id" : "finn-kontor-sok-lenke");
    valgtElement && focusElement(valgtElement);
  };

  const resultatRef = useRef(resultat);
  resultatRef.current = resultat;

  const [kontorValg, _setKontorValg] = useState(-1);
  const kontorValgRef = useRef(kontorValg);
  const setKontorValg = (value: number) => {
    kontorValgRef.current = value;
    _setKontorValg(value);
  };

  useEffect(() => {
    window.document.addEventListener("keydown", keyHandler);
    return () => {
      window.document.removeEventListener("keydown", keyHandler);
    };
  }, []);

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
    let counter = 0;
    const antallTreff = resultat.treffArray.length;
    const treffVisning = resultat.treffArray
      .slice(0, maxAntallDynamiskeTreffVisning)
      .map(hit => {
        const treff = stedsnavnTreff(hit, resultat.query, counter);
        counter += hit.enhetsnrArray.length;
        return treff;
      });

    return (
      <div className={`${cssPrefix}__resultatliste`}>
        {treffVisning}
        {antallTreff > maxAntallDynamiskeTreffVisning && (
          <div className={`${cssPrefix}__flere-treff`}>
            <Lenke
              href="#"
              id={"finn-kontor-sok-lenke"}
              onClick={(e) => {
                e.preventDefault();
                const knapp = window.document.getElementById("finn-kontor-knapp-id") as HTMLButtonElement;
                knapp && knapp.click();
              }}
            >
              <FormattedMessage id={"finnkontor.flere.treff"} values={{antall: antallTreff}}/>
            </Lenke>
          </div>
        )}
      </div>
    );
  }

  return null;
};
