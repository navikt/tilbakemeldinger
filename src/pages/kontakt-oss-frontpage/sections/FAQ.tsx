import React, { useState } from "react";
import Lenke from "nav-frontend-lenker";
import { lenkerFAQ, lenkerMinSide } from "./FAQLenker";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-faq-ikon.svg";

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  const [visFlereMinside, settVisFlereMinside] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  const toggleVisFlereMinSide = () => settVisFlereMinside(!visFlereMinside);
  const visElementer = 2;

  const tittel = <FormattedMessage id={"faq.intro"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel}>
      {lenkerFAQ
        .slice(0, visFlereFAQ ? lenkerFAQ.length : visElementer)
        .map(({ lenke, lenkeTekst }) => (
          <div key={lenkeTekst} className={"faq__lenke"}>
            <Lenke href={lenke}>
              <FormattedMessage id={lenkeTekst} />
            </Lenke>
          </div>
        ))}
      {lenkerFAQ.length > visElementer && (
        <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
      )}

      {/*{lenkerMinSide*/}
      {/*  .slice(0, visFlereMinside ? lenkerMinSide.length : visElementer)*/}
      {/*  .map(({ lenke, lenkeTekst }) => (*/}
      {/*    <div key={lenkeTekst} className={"faq__lenke"}>*/}
      {/*      <Lenke href={lenke}>*/}
      {/*        <FormattedMessage id={lenkeTekst} />*/}
      {/*      </Lenke>*/}
      {/*    </div>*/}
      {/*  ))}*/}
      {/*{lenkerMinSide.length > visElementer && (*/}
      {/*  <VisMer*/}
      {/*    visFlere={visFlereMinside}*/}
      {/*    onClick={toggleVisFlereMinSide}*/}
      {/*  />*/}
      {/*)}*/}
    </IkonPanel>
  );
};

export default FAQ;
