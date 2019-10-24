import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import { Link } from "react-router-dom";
import { lenker } from "./SkrivTilOssLenker";

const SkrivTilOss = () => (
  <Box icon={VeilederIcon}>
    {lenker.map(lenke => (
      <div key={lenke.lenkeTekst} className={"box__section"}>
        <div className={"box__section-title"}>
          <Undertittel className="box__title">{lenke.lenkeTekst}</Undertittel>
        </div>
        <div
          className={"box__section-description"}
          dangerouslySetInnerHTML={{ __html: lenke.beskrivelse }}
        />
        <div className={"box__section-lenke"}>
          {lenke.external ? (
            <a className={"lenke"} href={lenke.lenke}>
              {lenke.lenkeTekst}
            </a>
          ) : (
            <Link className={"lenke"} to={lenke.lenke}>
              {lenke.lenkeTekst}
            </Link>
          )}
        </div>
      </div>
    ))}
  </Box>
);

export default SkrivTilOss;
