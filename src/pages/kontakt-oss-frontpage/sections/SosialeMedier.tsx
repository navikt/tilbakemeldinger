import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import Environment from "../../../Environments";
const { baseUrl } = Environment();

const SosialeMedier = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">NAV i sosiale medier</Undertittel>
    </div>
    <div className={"box__section-description"}>
      Du treffer oss på <a href="https://www.nav.no">Facebook</a>,{" "}
      <a href="https://www.twitter.com/navnorge">Twitter</a>,{" "}
      <a href="https://www.linkedin.com/company/nav">Linkedin</a>,{" "}
      <a href="https://www.instagram.com/jobbmesse/">Instagram</a>, og{" "}
      <a href="https://www.youtube.com/user/NAVnorge">Youtube</a>
    </div>
    <div className="faq__lenke">
      <a
        className="lenke"
        href={`${baseUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/kontakt-nav-p%C3%A5-facebook-eller-twitter`}
      >
        Flere sosiale medier
      </a>
    </div>
  </Box>
);

export default SosialeMedier;
