import React, { useState } from "react";
import { lenkerFAQ } from "./FAQLenker";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-faq-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  // const [visFlereMinside, settVisFlereMinside] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  // const toggleVisFlereMinSide = () => settVisFlereMinside(!visFlereMinside);
  const visElementer = 3;

  const tittel = <FormattedMessage id={"faq.intro"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className={"faq"}>
      {lenkerFAQ
        .slice(0, visFlereFAQ ? lenkerFAQ.length : visElementer)
        .map(({ lenke, lenkeTekst }) => (
          <RouterLenke
            href={lenke}
            className={"lenke__avstand-under"}
            isExternal={true}
            key={lenkeTekst}
          >
            <FormattedMessage id={lenkeTekst} />
          </RouterLenke>
        ))}
      {lenkerFAQ.length > visElementer && (
        <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
      )}
    </IkonPanel>
  );
};

export default FAQ;
