import { LenkepanelData } from "../../types/lenker";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { Link } from "react-router-dom";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";

type Props = {
  lenkePanelData: LenkepanelData;
};

const SkrivTilOssLenkepanel = ({ lenkePanelData }: Props) => (
  <LenkepanelBase
    border={true}
    className="skriv-til-oss__temalenke linkbox__container"
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
        <Undertittel className="skriv-til-oss__temalenke-header lenkepanel__heading">
          <FormattedMessage id={lenkePanelData.tittel} />
        </Undertittel>
        <Normaltekst className="skriv-til-oss__lenkepanel-ingress">
          {lenkePanelData.ingress}
        </Normaltekst>
      </div>
    </div>
  </LenkepanelBase>
);

export default SkrivTilOssLenkepanel;
