import { urls } from "../../../Config";
import RouterLenkeMedChevron from "../../../components/routerlenke/RouterLenkeMedChevron";
import React from "react";

const cssPrefix = "finn-kontor";
const enhetsnrTilEnhetsinfo = require("../data/enhetsnr-til-enhetsinfo.json");

type EnhetsInfo = {
  navn: string,
  url: string
};

type Props = {
  enhetsnr: number,
  id?: string
};

export const KontorLenke = ({enhetsnr, id}: Props) => {
  const enhetsInfo = enhetsnrTilEnhetsinfo[enhetsnr] as EnhetsInfo;
  const url = `${urls.navKontorUrlPrefix}${enhetsInfo.url}`;

  return (
    <RouterLenkeMedChevron
      href={url}
      isExternal={true}
      className={`${cssPrefix}__kontorlenke`}
      id={id}
    >
      {enhetsInfo.navn}
    </RouterLenkeMedChevron>
  );
};
