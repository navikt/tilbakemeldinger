import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { urls } from "../../Config";
import RouterLenkeMedChevron from "../../components/routerlenke/RouterLenkeMedChevron";

const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");
const postnrTilEnhetsnr = require("./postnr-til-enhetsnr.json");

type Props = {
  postnr: string
};

const urlifyKontorNavn = (navn: string) => navn
  .toLowerCase()
  .replace(". ", ".")
  .replace(" ", "-")
  .replace("/", "-")
  .replace("æ", "ae")
  .replace("ø", "o")
  .replace("å", "a")
  .replace("ü", "u")
  .replace("á", "a")
  .replace("valer (innlandet)", "valer-i-hedmark")
  .replace("valer (ost-viken)", "valer");

export const KontorInfoSeksjon = ({postnr}: Props) => {
  const postnrUtenLedendeNull = parseInt(postnr, 10).toString();
  const enhetsnr = postnrTilEnhetsnr[postnrUtenLedendeNull];
  if (!enhetsnr) {
    return <FormattedMessage id={"finnkontor.ugyldig.postnr"} />;
  }

  const kontorNavn = enhetsnr && enhetsnrTilKontor[enhetsnr];
  if (!kontorNavn) {
    return <FormattedMessage id={"finnkontor.feil1"} />;
  }

  const url = `${urls.navKontorSidePrefix}${urlifyKontorNavn(kontorNavn)}`;

  return (
    <>
      <Normaltekst>
        <FormattedMessage id={"finnkontor.dittkontor"}/>
      </Normaltekst>
      <RouterLenkeMedChevron href={url} isExternal={true} className={"kontor-info-lenke"}>
        {kontorNavn}
      </RouterLenkeMedChevron>
    </>
  );
};
