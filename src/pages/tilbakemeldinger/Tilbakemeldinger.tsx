import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Header from "../../components/header/Header";
import LinkBox from "../../components/linkbox/LinkBox";
import MetaTags from "react-meta-tags";
import { useIntl } from "react-intl";
import Breadcrumbs from "../../components/breadcrumbs/Breadcrumbs";

const Tilbakemeldinger = () => {
  const intl = useIntl();
  return (
    <>
      <div className="pagecontent">
        <Breadcrumbs path={window.location.pathname} />
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
          <LinkBox
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
