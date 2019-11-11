import React from "react";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import { Undertittel } from "nav-frontend-typografi";
import { urls } from "../../../Config";

import ikon from "assets/forside-skrivtiloss-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const SkrivTilOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.skrivtiloss.tittel"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      <>
        <div>
          <div>
            <FormattedHTMLMessage id={"kontaktoss.skrivtiloss.beskrivelse"} />
          </div>
          <div>
            <ChevronLenke href={urls.skrivTilOss.forside}>
              <FormattedMessage id={"kontaktoss.skrivtiloss.knapp"} />
            </ChevronLenke>
          </div>
        </div>

        <div>
          <Undertittel>
            <FormattedMessage id={"kontaktoss.aktivitetsplan.tittel"} />
          </Undertittel>
          <p>
            <FormattedHTMLMessage
              id={"kontaktoss.aktivitetsplan.beskrivelse"}
            />
          </p>
          <ChevronLenke href={urls.aktivitetsplan} isExternal={true}>
            <FormattedMessage id={"kontaktoss.aktivitetsplan.knapp"} />
          </ChevronLenke>
        </div>
      </>
    </IkonPanel>
  );
};

export default SkrivTilOss;
