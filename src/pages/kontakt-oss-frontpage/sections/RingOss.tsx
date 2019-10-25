import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";

const RingOss = () => (
  <Box icon={VeilederIcon} margin={"2rem 0"}>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">Ring oss</Undertittel>
      </div>
      <div className={"box__section-description"}>
        Vi hjelper deg med generelle spørsmål og veiledning hverdager mellom
        08:00 - 15:00. Svartiden varierer, men det er kortest ventetid mellom
        10:00-13:00
      </div>
      <div className={"box__section-lenke"}>
        <div className={"box__section-lenke"}>
          <a className={"lenke"} href="www.nav.no">
            Flere spesialnumre og våre tastevalg
          </a>
        </div>
      </div>
    </div>
  </Box>
);

export default RingOss;
