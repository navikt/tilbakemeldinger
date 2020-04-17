import React, { useEffect } from "react";
import { Sidetittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import FeilOgMangler from "./sections/FeilOgMangler";
import Facebook from "./sections/Facebook";
import Tolketjenesten from "./sections/Tolketjenesten";
import Schema from "assets/schema.json";
import MetaTags from "react-meta-tags";
import { FormattedMessage, useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/topp-linje/ToppLinje";
import Chat from "./sections/Chat";
import RingOss from "./sections/RingOss";
import SkrivTilOss from "./sections/SkrivTilOss";
import FinnNavKontor from "./sections/FinnNavKontor";
import KlageOgTilbakemeldinger from "./sections/KlageOgTilbakemeldinger";
import KontaktVeileder from "./sections/KontaktVeileder";
import Pressekontakt from "./sections/Pressekontakt";
import SosialeMedier from "./sections/SosialeMedier";
import { VarselVisning } from "../../components/varsler/VarselVisning";
import Environment from "../../Environments";
import { localePath } from "../../utils/locale";
import { useStore } from "../../providers/Provider";

const KontaktOssFrontpage = () => {
  const intl = useIntl();
  const baseUrl = Environment().baseUrl;
  const [{ locale }] = useStore();

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
    <div className="frontpage__wrapper">
      <div className="pagecontent pagecontent__frontpage">
        <BreadcrumbsWrapper />
        <div className="frontpage">
          <MetaTags>
            <title>{intl.messages["seo.kontaktoss.tittel"]}</title>
            <meta
              name="description"
              content={intl.messages["seo.kontaktoss.description"] as string}
            />
            <link rel="canonical" href={`${baseUrl}${localePath("", locale)}`} />
            <link rel="alternate" href={`${baseUrl}${localePath("", "nb")}`} hrefLang="nb" />
            <link rel="alternate" href={`${baseUrl}${localePath("", "en")}`} hrefLang="en" />
            <link rel="alternate" href={`${baseUrl}${localePath("", "en")}`} hrefLang="x-default" />
          </MetaTags>
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>
                <FormattedMessage id={"kontaktoss.tittel"} />
              </Sidetittel>
            </div>
          </header>
          <VarselVisning />
          <div className="frontpage__content">
            <Chat />
            <div className="frontpage__row">
              <RingOss locale={locale} />
              <FAQ />
            </div>
            <KontaktVeileder />
            <SkrivTilOss />
            <Facebook />
            <FinnNavKontor />
            <Tolketjenesten locale={locale} />
            <KlageOgTilbakemeldinger />
            <FeilOgMangler />
            <Pressekontakt />
            <SosialeMedier />
          </div>
        </div>
        <BreadcrumbsWrapper />
      </div>
    </div>
  );
};

export default KontaktOssFrontpage;
