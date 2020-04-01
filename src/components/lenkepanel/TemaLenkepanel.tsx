// TODO: Erstatt/merge denne med den andre lenkepanel komponenten
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { Link } from "react-router-dom";
import { Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";
import { logEvent } from "../../utils/logger";
import { useStore } from "../../providers/Provider";
import { STOTema, TemaLenke } from "../../types/kanaler";
import { SanityBlocks } from "../sanity-blocks/SanityBlocks";
import { NavContentLoader } from "../content-loader/NavContentLoader";
import { skrivTilOssSosialhjelpErLansert } from "../../Config";

type Props = {
  lenkepanelData: TemaLenke;
  cssPrefix: string;
  disableIfClosed?: boolean;
};

const TemaLenkepanel = ({ lenkepanelData, cssPrefix, disableIfClosed }: Props) => {
  const onClick = () => {
    logEvent({ event: lenkepanelData.grafanaId });
  };

  const tema = lenkepanelData.tema;
  const [{ themes }] = useStore();
  const temaProps = themes.props[tema];

  if (tema === STOTema.Sosial && !skrivTilOssSosialhjelpErLansert) {
    return null;
  }

  const closed = temaProps.status && temaProps.status.closed;
  const closedMsg = temaProps.status && temaProps.status.message;
  const isDisabled = closed && disableIfClosed;
  const lenkePanelTekst = temaProps.link;
  const tittel = lenkePanelTekst && lenkePanelTekst.title;
  const ingress = lenkePanelTekst && lenkePanelTekst.description;

  return (
    <LenkepanelBase
      border={true}
      className={`${cssPrefix}__temalenke linkbox__container ${isDisabled
        ? ` ${cssPrefix}__lenkepanel-disabled` : ""}`}
      href={""}
      linkCreator={!isDisabled ? (props => {
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
              ? <SanityBlocks blocks={tittel} />
              : <FormattedMessage id={lenkepanelData.fallbackTittelId} />}
          </Undertittel>
          <div className={`${cssPrefix}__lenkepanel-ingress`}>
            {themes.isLoaded
              ? <SanityBlocks blocks={ingress} />
              : <NavContentLoader lines={2} lineHeight={6} />}
          </div>
          {isDisabled && closedMsg && <SanityBlocks blocks={closedMsg} />}
        </div>
      </div>
    </LenkepanelBase>
  );
};

export default TemaLenkepanel;
