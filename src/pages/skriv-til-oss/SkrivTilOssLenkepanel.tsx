import { useIntl } from "react-intl";
import React from "react";
import LinkBox from "../../components/linkbox/LinkBox";

export type LenkepanelData = {
  tittel: string;
  ingress: string;
  ingressValues?: {[key: string]: string};
  url: string;
  lenkeTekst: string;
  ikon?: any;
  external?: boolean;
};

type Props = {
  lenkePanelData: LenkepanelData;
};

const SkrivTilOssLenkepanel = ({ lenkePanelData }: Props) => {
  const formatMsg = useIntl().formatMessage;

  return(
    <LinkBox
      id={lenkePanelData.tittel}
      tittel={formatMsg({id: lenkePanelData.tittel})}
      beskrivelse={formatMsg({id: lenkePanelData.ingress}, lenkePanelData.ingressValues)}
      lenkeTekst={formatMsg({id: lenkePanelData.lenkeTekst})}
      to={lenkePanelData.url}
      external={lenkePanelData.external}
    />
  );
};

export default SkrivTilOssLenkepanel;
