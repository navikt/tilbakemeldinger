import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import LenkePanel from "./sections/LenkePanel";
import KontaktOss from "./sections/SkrivTilOss";
import UnderUtvikling from "../../components/veiledere/UnderUtvikling";
import FeilOgMangler from "./sections/FeilOgMangler";
import SosialeMedier from "./sections/SosialeMedier";
import Tolketjenesten from "./sections/Toketjenesten";
import Schema from "assets/schema.json";
import MetaTags from "react-meta-tags";
import { useIntl } from "react-intl";

const KontaktOssFrontpage = () => {
  const intl = useIntl();

  useEffect(() => {
    /*
      Add schema from assets
     */
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(Schema);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="pagecontent">
      <div className="frontpage">
        <MetaTags>
          <title>{intl.messages["kontaktoss.tittel"]}</title>
          <meta
            name="description"
            content={intl.messages["kontaktoss.description"] as string}
          />
        </MetaTags>
        <header className="frontpage__introduksjon">
          <div className="frontpage__sidetittel">
            <Sidetittel>Kontakt oss</Sidetittel>
          </div>
        </header>
        <UnderUtvikling />
        <div className="frontpage__content">
          <FAQ />
          <KontaktOss />
          <LenkePanel />
          <Tolketjenesten />
          <FeilOgMangler />
          <SosialeMedier />
        </div>
      </div>
    </div>
  );
};

export default KontaktOssFrontpage;
