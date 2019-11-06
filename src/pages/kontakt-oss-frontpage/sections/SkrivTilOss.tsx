import React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";
import { Undertittel } from "nav-frontend-typografi";
import { Link } from "react-router-dom";
import { urls } from "../../../Config";
import Box from "../../../components/box/Box";
import Lenke from "nav-frontend-lenker";

const SkrivTilOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div className={"box__section"}>
          <div className={"box__section-description"}>
            <FormattedHTMLMessage id={"kontaktoss.skrivtiloss.beskrivelse"} />
          </div>
          <div className={"box__section-lenke"}>
            <Link className={"lenke"} to={urls.skrivTilOss.forside}>
              <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"} />
            </Link>
          </div>
        </div>

        <div className={"box__section"}>
          <div className={"box__section-title"}>
            <Undertittel className="box__title">
              <FormattedMessage id={"kontaktoss.aktivitetsplan.tittel"} />
            </Undertittel>
          </div>
          <div className={"box__section-description"}>
            <FormattedHTMLMessage id={"kontaktoss.aktivitetsplan.beskrivelse"} />
          </div>
          <div className={"box__section-lenke"}>
            <Lenke href={urls.aktivitetsplan}>
              <FormattedMessage id={"kontaktoss.aktivitetsplan.knapp"} />
            </Lenke>
          </div>
        </div>
      </>
    </IkonPanel>
  );
};

export default SkrivTilOss;
