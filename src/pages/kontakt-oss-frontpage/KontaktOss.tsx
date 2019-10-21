import React from "react";
import { Sidetittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import LenkePanel from "./sections/lenkepanel/LenkePanel";
import SkrivTilOss from "./sections/SkrivTilOss";
import UnderUtvikling from "../../components/veiledere/UnderUtvikling";
import RingOss from "./sections/RingOss";

const KontaktOssFrontpage = () => {
  document.title = "Kontakt oss - www.nav.no";
  return (
    <div className="pagecontent">
      <div className="frontpage">
        <header className="frontpage__introduksjon">
          <div className="frontpage__sidetittel">
            <Sidetittel>Kontakt oss</Sidetittel>
          </div>
        </header>
        <UnderUtvikling />
        <div className="frontpage__content">
          <FAQ />
          <SkrivTilOss />
          <RingOss />
          <LenkePanel />
        </div>
      </div>
    </div>
  );
};

export default KontaktOssFrontpage;
