import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Tilbake from "../../components/tilbake/Tilbake";
import { urls } from "../../Config";
import Header from "../../components/header/Header";
import LinkBox from "../../components/linkbox/LinkBox";
import MetaTags from "react-meta-tags";
import { useIntl } from "react-intl";

const Tilbakemeldinger = () => {
  const intl = useIntl();
  return (
    <>
      <div className="pagecontent">
        <MetaTags>
          <title>{intl.messages["tilbakemeldinger.tittel"]}</title>
          <meta
            name="description"
            content={intl.messages["tilbakemeldinger.description"] as string}
          />
        </MetaTags>
        <Tilbake to={urls.forside} />
        <div className={"tilbakemeldinger__tittel"}>
          <Header title={"Tilbakemeldinger til NAV"} />
        </div>
        {lenker.map(lenke => (
          <LinkBox
            key={lenke.tittel}
            id={lenke.tittel}
            tittel={lenke.tittel}
            beskrivelse={lenke.beskrivelse}
            to={lenke.lenke}
            lenkeTekst={lenke.lenkeTekst}
            external={lenke.external}
          />
        ))}
      </div>
    </>
  );
};
export default Tilbakemeldinger;
