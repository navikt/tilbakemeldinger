import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import UnderUtvikling from "../../components/veiledere/UnderUtvikling";
import FeilOgMangler from "./sections/FeilOgMangler";
import SosialeMedier from "./sections/SosialeMedier";
import Tolketjenesten from "./sections/Tolketjenesten";
import Schema from "assets/schema.json";
import MetaTags from "react-meta-tags";
import { FormattedMessage, useIntl } from "react-intl";
import Environment from "../../Environments";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";
import Chat from "./sections/Chat";
import RingOss from "./sections/RingOss";
import SkrivTilOss from "./sections/SkrivTilOss";
import FinnNavKontor from "./sections/FinnNavKontor";
import KlageOgTilbakemeldinger from "./sections/KlageOgTilbakemeldinger";
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
    <div className="pagecontent pagecontent__frontpage">
      <BreadcrumbsWrapper />
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
          <Chat />
          <div className="frontpage__row">
            <RingOss />
            <FAQ />
          </div>
          <SkrivTilOss />
          <SosialeMedier />
          <FinnNavKontor />
          <Tolketjenesten />
          <KlageOgTilbakemeldinger />
          <FeilOgMangler />
        </div>
      </div>
    </div>
  );
};

export default KontaktOssFrontpage;
