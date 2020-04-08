import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Header from "../../components/header/Header";
import TilpassetLenkepanel from "../../components/lenkepanel/Lenkepanel";
import MetaTags from "react-meta-tags";
import { useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/topp-linje/ToppLinje";
import { localePath } from "../../utils/locale";
import { useStore } from "../../providers/Provider";

const Tilbakemeldinger = () => {
  const intl = useIntl();
  const [{ locale }] = useStore();

  return (
    <>
      <div className="pagecontent">
        <BreadcrumbsWrapper />
        <MetaTags>
          <title>{intl.messages["seo.tilbakemeldinger.tittel"]}</title>
          <meta
            name="description"
            content={
              intl.messages["seo.tilbakemeldinger.description"] as string
            }
          />
        </MetaTags>
        <div className={"tilbakemeldinger__tittel"}>
          <Header
            title={intl.formatMessage({ id: "tilbakemeldinger.sidetittel" })}
          />
        </div>
        {lenker.map(lenke => (
          <TilpassetLenkepanel
            icon={lenke.icon}
            key={lenke.tittel}
            id={lenke.tittel}
            tittel={intl.messages[lenke.tittel] as string}
            beskrivelse={lenke.beskrivelse}
            to={lenke.external ? lenke.lenke : localePath(lenke.lenke, locale)}
            lenkeTekst={intl.messages[lenke.lenkeTekst] as string}
            external={lenke.external}
          />
        ))}
      </div>
    </>
  );
};
export default Tilbakemeldinger;
