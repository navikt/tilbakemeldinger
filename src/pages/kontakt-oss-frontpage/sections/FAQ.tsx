import React, { useState } from "react";
import { lenkerFAQ } from "./FAQLenker";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-faq-ikon.svg";
import Lenke from "../../../components/lenke/Lenke";

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
          <Lenke href={lenke} isExternal={true} key={lenkeTekst}>
            <FormattedMessage id={lenkeTekst} />
          </Lenke>
        ))}
      {lenkerFAQ.length > visElementer && (
        <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
      )}
    </IkonPanel>
  );
};

export default FAQ;
