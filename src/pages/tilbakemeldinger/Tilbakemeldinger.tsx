import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Tilbake from "../../components/tilbake/Tilbake";
import { urls } from "../../Config";
import Header from "../../components/header/Header";
import LinkBox from "../../components/linkbox/LinkBox";
import Box from "../../components/box/Box";

const Tilbakemeldinger = () => {
  document.title = "Tilbakemeldinger - www.nav.no";
  return (
    <>
      <div className="pagecontent">
        <Tilbake to={urls.forside} />
        <Header title={"Tilbakemeldinger til NAV"} />
        <Box>
          {lenker.map(lenke => (
            <LinkBox
              key={lenke.tittel}
              id={lenke.tittel}
              tittel={lenke.tittel}
              beskrivelse={lenke.beskrivelse}
              to={lenke.lenke}
              lenkeTekst={lenke.lenkeTekst}
              component={lenke.external ? "a" : "Link"}
            />
          ))}
        </Box>
      </div>
    </>
  );
};
export default Tilbakemeldinger;
