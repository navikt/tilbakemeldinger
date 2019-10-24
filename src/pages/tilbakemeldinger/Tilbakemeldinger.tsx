import React from "react";
import { Normaltekst, Sidetittel, Undertittel } from "nav-frontend-typografi";
import { lenker } from "./TilbakemeldingerLenker";
import { LenkepanelBase } from "nav-frontend-lenkepanel";
import { Link } from "react-router-dom";
import Tilbake from "../../components/tilbake/Tilbake";
import { urls } from "../../Config";

const Tilbakemeldinger = () => {
  document.title = "Tilbakemeldinger - www.nav.no";
  return (
    <>
      <div className="pagecontent">
        <Tilbake to={urls.forside} />
        <div className="tilbakemeldinger">
          <header className="tilbakemeldinger__introduksjon">
            <div className="tilbakemeldinger__sidetittel">
              <Sidetittel>Tilbakemeldinger til NAV</Sidetittel>
            </div>
          </header>
          <div className="tilbakemeldinger__content">
            {lenker.map((lenke, key) => (
              <LenkepanelBase
                key={key}
                border={true}
                className="lenke__panel"
                href={lenke.lenke}
                linkCreator={props => {
                  return lenke.external ? (
                    <a href={lenke.lenke} className={props.className}>
                      {props.children}
                    </a>
                  ) : (
                    <Link to={lenke.lenke} className={props.className}>
                      {props.children}
                    </Link>
                  );
                }}
              >
                <div className="lenke__container">
                  <div className="lenke__tittel">
                    <Undertittel className="lenkepanel__heading">
                      {lenke.tittel}
                    </Undertittel>
                  </div>
                  <div className="lenke__beskrivelse">
                    <Normaltekst>{lenke.beskrivelse}</Normaltekst>
                  </div>
                  <div className="lenke">
                    <Normaltekst>{lenke.lenkeTekst}</Normaltekst>
                  </div>
                </div>
              </LenkepanelBase>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Tilbakemeldinger;
