import React, { useState } from "react";
import VisMer from "./FAQLenkerVisMer";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-faq-ikon.svg";
import RouterLenke from "../../../components/routerlenke/RouterLenkeMedChevron";
import { useStore } from "../../../providers/Provider";
import { Language } from "../../../utils/sanity/serializers";

const language = Language.Bokmaal;

const FAQ = () => {
  const [visFlereFAQ, settVisFlereFAQ] = useState(false);
  // const [visFlereMinside, settVisFlereMinside] = useState(false);
  const toggleVisFlereFAQ = () => settVisFlereFAQ(!visFlereFAQ);
  // const toggleVisFlereMinSide = () => settVisFlereMinside(!visFlereMinside);
  const visElementer = 3;
  const [{faq: lenkerFAQ}] = useStore();
  console.log(lenkerFAQ);

  const tittel = <FormattedMessage id={"faq.intro"} />;

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className={"faq"}>
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
        })}
      {lenkerFAQ.length > visElementer && (
        <VisMer visFlere={visFlereFAQ} onClick={toggleVisFlereFAQ} />
      )}
    </IkonPanel>
  );
};

export default FAQ;
