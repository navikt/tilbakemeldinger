import React from "react";
import { Sidetittel } from "nav-frontend-typografi";
import Header from "../../components/header/Header";
import Lenke from "nav-frontend-lenker";
import { urls } from "../../Config";

const KontaktOssFrontpage = () => {
  document.title = "Kontakt oss - www.nav.no";
  return (
    <>
      <Header />
      <div className="pagecontent">
        <div className="frontpage">
          <header className="frontpage__introduksjon">
            <div className="frontpage__sidetittel">
              <Sidetittel>Kontakt oss</Sidetittel>
            </div>
          </header>
          <div className="frontpage__content">
            <Lenke href={urls.skrivTilOss.forside}>{"Skriv til oss."}</Lenke>
          </div>
        </div>
      </div>
    </>
  );
};

export default KontaktOssFrontpage;
