import React, { useState } from "react";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-faq-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { useStore } from "../../../providers/Provider";
import { Language } from "../../../utils/sanity/serializers";
import NavFrontendSpinner from "nav-frontend-spinner";

const language = Language.Bokmaal;

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  // const [visFlereMinside, settVisFlereMinside] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  // const toggleVisFlereMinSide = () => settVisFlereMinside(!visFlereMinside);
  const visElementer = 3;
  const [{ faq }] = useStore();
  const lenkerFAQ = faq.faqLenker;

  const tittel = <FormattedMessage id={"faq.intro"} />;

  const innhold = (
    <>
      {lenkerFAQ
        .slice(0, visFlereFAQ ? lenkerFAQ.length : visElementer)
        .map(({ lenke, tittel }) => {
          return (<RouterLenke
            href={lenke[language]}
            className={"lenke__avstand-under"}
            isExternal={true}
            key={tittel[language]}
          >
            {tittel[language]}
          </RouterLenke>)
        })
      }
      {lenkerFAQ.length > visElementer && (
        <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
      )}
    </>
  );

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className={"faq"}>
      {faq.isLoaded ? innhold : <NavFrontendSpinner />}
    </IkonPanel>
  );
};

export default FAQ;
