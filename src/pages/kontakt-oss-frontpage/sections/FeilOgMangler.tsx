import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { urls } from "../../../Config";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-chat-ikon.svg";

const FeilOgMangler = () => {
  const tittel = <FormattedMessage id={"kontaktoss.tekniskfeil.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <div className={"box__section-description"}>
        <div className="faq__lenke">
          <a className="lenke" href={urls.tekniskBrukerstotte.selvhjelp}>
            <FormattedMessage id={"kontaktoss.tekniskfeil.link.losselv"} />
          </a>
        </div>
        <div className="faq__lenke">
          <Link className="lenke" to={urls.tilbakemeldinger.feilogmangler}>
            <FormattedMessage id={"kontaktoss.tekniskfeil.link.meldifra"} />
          </Link>
        </div>
        <div className="faq__lenke">
          <a className="lenke" href={urls.tekniskBrukerstotte.ring}>
            <FormattedMessage id={"kontaktoss.tekniskfeil.link.ring"} />
          </a>
        </div>
      </div>
    </IkonPanel>
  );
};

export default FeilOgMangler;
