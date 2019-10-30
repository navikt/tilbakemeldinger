import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Tilbake from "../../components/tilbake/Tilbake";
import { urls } from "../../Config";
import Header from "../../components/header/Header";
import TilpassetLenkepanel from "../../components/lenkepanel/Lenkepanel";
import MetaTags from "react-meta-tags";
import { useIntl } from "react-intl";

const Tilbakemeldinger = () => {
  const intl = useIntl();
  return (
    <>
      <div className="pagecontent">
        <MetaTags>
          <title>{intl.messages["seo.tilbakemeldinger.tittel"]}</title>
          <meta
            name="description"
            content={
              intl.messages["seo.tilbakemeldinger.description"] as string
            }
          />
        </MetaTags>
        <Tilbake to={urls.forside} />
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
