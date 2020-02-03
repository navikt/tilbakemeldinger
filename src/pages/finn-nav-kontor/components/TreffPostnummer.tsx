import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { KontorLenke } from "./KontorLenke";

const cssPrefix = "finn-kontor";

type Props = {
  enhetsnr: number;
  postnr: string;
};

export const TreffPostnummer = ({enhetsnr, postnr}: Props) => (
  <div className={`${cssPrefix}__resultat`}>
    <Normaltekst>
      <FormattedMessage id={"finnkontor.resultat.postnr"}/>
      <span className={`${cssPrefix}__treff-uthevet`}>{postnr}</span><span>{":"}</span>
    </Normaltekst>
    <div className={`${cssPrefix}__kontorliste`}>
      <KontorLenke enhetsnr={enhetsnr} id={"kontor-id-0"}/>
    </div>
  </div>
);
