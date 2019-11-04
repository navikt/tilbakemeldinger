import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Header from "../../components/header/Header";
import TilpassetLenkepanel from "../../components/lenkepanel/Lenkepanel";
import MetaTags from "react-meta-tags";
import { useIntl } from "react-intl";
import BreadcrumbsWrapper from "../../components/breadcrumbs/BreadcrumbsWrapper";

const Tilbakemeldinger = () => {
  const intl = useIntl();
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
          <Header title={"Tilbakemeldinger til NAV"} />
        </div>
        {lenker.map(lenke => (
          <TilpassetLenkepanel
            key={lenke.tittel}
            id={lenke.tittel}
            tittel={intl.messages[lenke.tittel] as string}
            beskrivelse={intl.messages[lenke.beskrivelse] as string}
            to={lenke.lenke}
            lenkeTekst={intl.messages[lenke.lenkeTekst] as string}
            external={lenke.external}
          />
        ))}
      </div>
    </>
  );
};
export default Tilbakemeldinger;
