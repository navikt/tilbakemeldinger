import React from "react";
import { Sidetittel } from "nav-frontend-typografi";
import FAQ from "./sections/FAQ";
import LenkePanel from "./sections/LenkePanel";
import SkrivTilOss from "./sections/SkrivTilOss";
import UnderUtvikling from "../../components/veiledere/UnderUtvikling";
import RingOss from "./sections/RingOss";
import FeilOgMangler from "./sections/FeilOgMangler";
import SosialeMedier from "./sections/SosialeMedier";
import Tolketjenesten from "./sections/Toketjenesten";

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
          <Tolketjenesten />
          <LenkePanel />
          <FeilOgMangler />
          <SosialeMedier />
        </div>
      </div>
    </div>
  );
};

export default KontaktOssFrontpage;
