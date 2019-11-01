import React from "react";
import eksterneLenker from "./LenkePanelLenker";
import Box from "../../../components/box/Box";
import { Undertittel } from "nav-frontend-typografi";
import { Link } from "react-router-dom";
import { FormattedHTMLMessage, FormattedMessage } from "react-intl";

const LenkePanel = () => {
  return (
    <>
      {eksterneLenker.map(link => (
        <Box key={link.tittel}>
          <>
            <div className={"box__section-title"}>
              <Undertittel className="box__title">
                <FormattedMessage id={link.tittel} />
              </Undertittel>
            </div>
            <div className={"box__section-description"}>
              <FormattedHTMLMessage id={link.beskrivelse} />
            </div>
            {link.url && link.lenkeTekst && (
              <>
                {link.external ? (
                  <a className="lenke" href={link.url}>
                    <FormattedMessage id={link.lenkeTekst} />
                  </a>
                ) : (
                  <Link className="lenke" to={link.url}>
                    <FormattedMessage id={link.lenkeTekst} />
                  </Link>
                )}
              </>
            )}
          </>
        </Box>
      ))}
    </>
  );
};

export default LenkePanel;
