import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import LenkePanel from "./sections/LenkePanel";
import KontaktOss from "./sections/KontaktOss";
import UnderUtvikling from "../../components/veiledere/UnderUtvikling";
import FeilOgMangler from "./sections/FeilOgMangler";
import SosialeMedier from "./sections/SosialeMedier";
import Tolketjenesten from "./sections/Toketjenesten";
import Schema from "assets/schema.json";
import MetaTags from "react-meta-tags";
import { FormattedMessage, useIntl } from "react-intl";
import Environment from "../../Environments";
const { miljo } = Environment();

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
          <title>{intl.messages["seo.kontaktoss.tittel"]}</title>
          <meta
            name="description"
            content={intl.messages["seo.kontaktoss.description"] as string}
          />
        </MetaTags>
        <header className="frontpage__introduksjon">
          <div className="frontpage__sidetittel">
            <Sidetittel>
              <FormattedMessage id={"kontaktoss.tittel"} />
            </Sidetittel>
          </div>
        </header>
        {miljo === "PROD" && <UnderUtvikling />}
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
