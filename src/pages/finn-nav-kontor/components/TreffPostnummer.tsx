import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { KontorLenke } from "./KontorLenke";

const cssPrefix = "finn-kontor";

type Props = {
  enhetsnrArray: Array<number>;
  postnummer: string;
};

export const TreffPostnummer = ({enhetsnrArray, postnummer}: Props) => (
  <div className={`${cssPrefix}__resultat`}>
    <Normaltekst>
      <FormattedMessage id={"finnkontor.resultat.postnr"}/>
      <span className={`${cssPrefix}__treff-uthevet`}>{postnummer}</span><span>{":"}</span>
    </Normaltekst>
    <div className={`${cssPrefix}__kontorliste`}>
      <KontorLenke enhetsnr={enhetsnrArray[0]} id={"kontor-id-0"}/>
    </div>
  </div>
);
