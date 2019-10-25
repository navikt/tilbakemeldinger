import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Tilbake from "../../components/tilbake/Tilbake";
import { urls } from "../../Config";
import Header from "../../components/header/Header";
import LinkBox from "../../components/linkbox/LinkBox";

const Tilbakemeldinger = () => {
  document.title = "Tilbakemeldinger - www.nav.no";
  return (
    <>
      <div className="pagecontent">
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
