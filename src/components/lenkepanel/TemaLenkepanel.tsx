// TODO: Erstatt/merge denne med den andre lenkepanel komponenten
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { Link } from "react-router-dom";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { logEvent } from "../../utils/logger";
import { TemaLenkepanelData } from "../../pages/skriv-til-oss/SkrivTilOssData";
import { useStore } from "../../providers/Provider";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../utils/sanity/serializers";

type Props = {
  lenkepanelData: TemaLenkepanelData;
  cssPrefix: string;
};

const TemaLenkepanel = ({ lenkepanelData, cssPrefix }: Props) => {
  const onClick = () => {
    logEvent({ event: lenkepanelData.grafanaId });
  };

  const [{ themes }] = useStore();
  const temaProps = themes.props[lenkepanelData.tema];
  const lenkePanelTekst = temaProps.link;
  const tittel = lenkePanelTekst && lenkePanelTekst.title;
  const ingress = lenkePanelTekst && lenkePanelTekst.description;

  return (
    <LenkepanelBase
      border={true}
      className={`${cssPrefix}__temalenke linkbox__container`}
      href={"#"}
      linkCreator={props => {
        return lenkepanelData.harUndertemaer ? (
          <Link
            to={lenkepanelData.url}
            className={props.className}
            onClick={onClick}
          >
            {props.children}
          </Link>
        ) : (
          <a
            href={lenkepanelData.url}
            className={props.className}
            onClick={onClick}
          >
            {props.children}
          </a>
        );
      }}
    >
      <div>
        {lenkepanelData.ikon && <div>{lenkepanelData.ikon}</div>}
        <div>
          <Undertittel className={`${cssPrefix}__temalenke-header lenkepanel__heading`}>
            {tittel
              ? <BlockContent blocks={tittel} serializers={serializers} />
              : <FormattedMessage id={lenkepanelData.tittelFallbackId} />}
          </Undertittel>
          <div className={`${cssPrefix}__lenkepanel-ingress`}>
            <BlockContent blocks={ingress} serializers={serializers} />
          </div>
        </div>
      </div>
    </LenkepanelBase>
  );
};

export default TemaLenkepanel;
