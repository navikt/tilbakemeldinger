// TODO: Erstatt/merge denne med den andre lenkepanel komponenten
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { Link } from "react-router-dom";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { logEvent } from "../../utils/logger";
import { useStore } from "../../providers/Provider";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../utils/sanity/serializers";
import { TjenesteStengtMelding } from "../varsler/tjeneste-stengt/TjenesteStengtMelding";
import { TemaLenke } from "../../types/kanaler";

type Props = {
  lenkepanelData: TemaLenke;
  cssPrefix: string;
};

const TemaLenkepanel = ({ lenkepanelData, cssPrefix }: Props) => {
  const onClick = () => {
    logEvent({ event: lenkepanelData.grafanaId });
  };

  const tema = lenkepanelData.tema;
  const [{ themes }] = useStore();
  const temaProps = themes.props[tema];

  const disableLink = temaProps.closed && tema.includes("sto-");
  const lenkePanelTekst = temaProps.link;
  const tittel = lenkePanelTekst && lenkePanelTekst.title;
  const ingress = lenkePanelTekst && lenkePanelTekst.description;

  return (
    <LenkepanelBase
      border={true}
      className={`${cssPrefix}__temalenke linkbox__container ${disableLink
        ? ` ${cssPrefix}__lenkepanel-disabled` : ""}`}
      href={""}
      linkCreator={!disableLink ? (props => {
        return lenkepanelData.externalUrl ? (
          <a
            href={lenkepanelData.url}
            className={props.className}
            onClick={onClick}
          >
            {props.children}
          </a>
        ) : (
          <Link
            to={lenkepanelData.url}
            className={props.className}
            onClick={onClick}
          >
            {props.children}
          </Link>
        );
      }) : undefined}
    >
      <div>
        {lenkepanelData.ikon && <div>{lenkepanelData.ikon}</div>}
        <div>
          <Undertittel className={`${cssPrefix}__temalenke-header lenkepanel__heading`}>
            {tittel
              ? <BlockContent blocks={tittel} serializers={serializers} />
              : <FormattedMessage id={lenkepanelData.tittelId} />}
          </Undertittel>
          <div className={`${cssPrefix}__lenkepanel-ingress`}>
            <BlockContent blocks={ingress} serializers={serializers} />
          </div>
          {disableLink && <TjenesteStengtMelding />}
        </div>
      </div>
    </LenkepanelBase>
  );
};

export default TemaLenkepanel;
