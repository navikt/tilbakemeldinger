import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { minQueryLength, SokeResultat, SokeStatus } from "../FinnNavKontorSok";
import { TreffPostnummer } from "./TreffPostnummer";
import { TreffStedsnavn } from "./TreffStedsnavn";

const cssPrefix = "finn-kontor";

type ResultProps = {
  resultat: SokeResultat
};

export const ResultatvisningVedSubmit = ({resultat}: ResultProps) => {
  if (resultat.status === SokeStatus.PostnrTreff) {
    return (
      <TreffPostnummer
        enhetsnrArray={resultat.treffArray[0].enhetsnrArray}
        postnummer={resultat.treffArray[0].treffString}
      />
    );
  }

  if (resultat.status === SokeStatus.StedsnavnTreff) {
    const resultatListe = resultat.treffArray.map(treff => (
      <TreffStedsnavn
        treff={treff}
        query={resultat.query}
        key={treff.treffString}
      />
    ));

    return (
      <>
        <Normaltekst>
          <FormattedMessage
            id={"finnkontor.resultat.stedsnavn"}
            values={{query: resultat.query, antall: resultat.treffArray.length}}
          />
        </Normaltekst>
        <div className={`${cssPrefix}__resultatliste`}>
          {resultatListe}
        </div>
      </>
    );
  }

  if (resultat.status === SokeStatus.QueryFeil) {
    return <FormattedMessage id={"finnkontor.query.feil"} values={{min: minQueryLength}}/>;
  }

  if (resultat.status === SokeStatus.UgyldigPostnr) {
    return <FormattedMessage id={"finnkontor.ugyldig.postnr"} values={{nummer: resultat.query}}/>;
  }

  if (resultat.status === SokeStatus.IngenTreff) {
    return <FormattedMessage id={"finnkontor.ingen.treff"} values={{query: resultat.query}}/>;
  }

  return null;
};
