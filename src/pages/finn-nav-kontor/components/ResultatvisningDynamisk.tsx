import React, { useEffect, useRef, useState } from "react";
import { minQueryLength, SokeResultat, SokeStatus } from "../FinnNavKontorSok";
import { FormattedMessage } from "react-intl";
import Lenke from "nav-frontend-lenker";
import { TreffPostnummer } from "./TreffPostnummer";
import { TreffStedsnavn } from "./TreffStedsnavn";

const cssPrefix = "finn-kontor";
const maxAntallDynamiskeTreff = 10;

type Props = {
  resultat: SokeResultat
};

const focusElement = (element: HTMLElement) => {
  element.focus();
  const parent = document.getElementById("preview-container-id");
  parent && parent.scrollTo(0, element.offsetTop - parent.offsetHeight / 3);
};

export const ResultatvisningDynamisk = ({resultat}: Props) => {
  const [kontorValg, _setKontorValg] = useState(-1);
  const kontorValgRef = useRef(kontorValg);
  const setKontorValg = (value: number) => {
    kontorValgRef.current = value;
    _setKontorValg(value);
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setKontorValg(Math.max(kontorValgRef.current - 1, -1));
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const antallVisteKontorer = resultat.treffArray
          .slice(0, maxAntallDynamiskeTreff)
          .reduce((counter, treff) => counter + treff.enhetsnrArray.length, 0);
        const maxValue = resultat.treffArray.length > maxAntallDynamiskeTreff
          ? antallVisteKontorer
          : antallVisteKontorer - 1;
        setKontorValg(Math.min(kontorValgRef.current + 1, maxValue));
      } else {
        return;
      }

      const valgtElement = document.getElementById(`kontor-id-${kontorValgRef.current}`)
        || document.getElementById(kontorValgRef.current === -1 ? "finn-kontor-input-id" : "finn-kontor-sok-lenke");
      if (valgtElement) {
        focusElement(valgtElement);
      }
    };

    window.document.addEventListener("keydown", keyHandler);
    return () => {
      window.document.removeEventListener("keydown", keyHandler);
    };
  }, [resultat]);

  if (resultat.status === SokeStatus.PostnrTreff) {
    return (
      <TreffPostnummer
        enhetsnr={resultat.treffArray[0].enhetsnrArray[0]}
        postnr={resultat.treffArray[0].treffString}
      />
    );
  }

  if (resultat.status === SokeStatus.StedsnavnTreff) {
    let idCounter = 0;
    const antallTreff = resultat.treffArray.length;
    const resultatListe = resultat.treffArray
      .slice(0, maxAntallDynamiskeTreff)
      .map(treff => {
        const treffStedsnavn = (
          <TreffStedsnavn
            treff={treff}
            query={resultat.query}
            kontorIdStart={idCounter}
            key={treff.treffString}
          />
        );
        idCounter += treff.enhetsnrArray.length;
        return treffStedsnavn;
      });

    return (
      <div className={`${cssPrefix}__resultatliste`}>
        {resultatListe}
        {antallTreff > maxAntallDynamiskeTreff && (
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

  if (resultat.status === SokeStatus.UgyldigPostnr || resultat.status === SokeStatus.IngenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  if (resultat.status === SokeStatus.QueryFeil) {
    return <FormattedMessage id={"finnkontor.query.feil.kort"} values={{min: minQueryLength}}/>;
  }

  return null;
};
