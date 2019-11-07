import React, { useState } from "react";
import { lenkerFAQ } from "./FAQLenker";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-faq-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  // const [visFlereMinside, settVisFlereMinside] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  // const toggleVisFlereMinSide = () => settVisFlereMinside(!visFlereMinside);
  const visElementer = 2;

  const tittel = <FormattedMessage id={"faq.intro"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className={"faq"}>
      {lenkerFAQ
        .slice(0, visFlereFAQ ? lenkerFAQ.length : visElementer)
        .map(({ lenke, lenkeTekst }) => (
          <ChevronLenke href={lenke} isExternal={true} key={lenkeTekst}>
            <FormattedMessage id={lenkeTekst} />
          </ChevronLenke>
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
