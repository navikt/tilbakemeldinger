import { LenkepanelData } from "../../types/lenker";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { Link } from "react-router-dom";
import { Systemtittel, Undertekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";

type Props = {
  lenkePanelData: LenkepanelData,
};

const SkrivTilOssLenkepanel = ({lenkePanelData}: Props) => (
  <LenkepanelBase
    border={true}
    className="skriv-til-oss__temalenke"
    linkCreator={props => {
      return lenkePanelData.external ? (
        <a href={lenkePanelData.url} className={props.className}>
          {props.children}
        </a>
      ) : (
        <Link to={lenkePanelData.url} className={props.className}>
          {props.children}
        </Link>
      );
    }}
  >
    <div>
      {lenkePanelData.ikon ? <div>{lenkePanelData.ikon}</div> : null}
      <div>
        <Systemtittel className="skriv-til-oss__temalenke-header lenkepanel__heading">
          <FormattedMessage id={lenkePanelData.tittel}/>
        </Systemtittel>
        <Undertekst className="skriv-til-oss__temalenke-ingress">
          {lenkePanelData.ingress}
        </Undertekst>
      </div>
    </div>
  </LenkepanelBase>
);

export default SkrivTilOssLenkepanel;
