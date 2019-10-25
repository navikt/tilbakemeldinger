import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import Environment from "../../../Environments";
import facebookIcon from "assets/icons/line/line-version-logo-facebook.svg";
import twitterIcon from "assets/icons/line/line-version-logo-twitter-bird.svg";
import linkedinIcon from "assets/icons/line/line-version-logo-linkedin.svg";
import instagramIcon from "assets/icons/line/line-version-logo-instagram.svg";
import youtubeIcon from "assets/icons/line/line-version-logo-youtube-clip.svg";
const { baseUrl } = Environment();

const urlSosialeMedier = `${baseUrl}/no/NAV+og+samfunn/Kontakt+NAV/Kontakt+oss/Kontakt+NAV+p%C3%A5+chat+Facebook+og+Twitter/kontakt-nav-p%C3%A5-facebook-eller-twitter`;

const SosialeMedier = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">NAV i sosiale medier</Undertittel>
    </div>
    <div className={"box__section-description"}>
      Du treffer oss på <a href={urlSosialeMedier}>Facebook</a>,{" "}
      <a href="https://www.twitter.com/navnorge">Twitter</a>,{" "}
      <a href="https://www.linkedin.com/company/nav">Linkedin</a>,{" "}
      <a href="https://www.instagram.com/jobbmesse/">Instagram</a>, og{" "}
      <a href="https://www.youtube.com/user/NAVnorge">Youtube</a>
    </div>
    <div>
      <a href={urlSosialeMedier}>
        <img className="sm__ikon" src={facebookIcon} alt="Facebook" />
      </a>
      <a href="https://www.twitter.com/navnorge">
        <img className="sm__ikon" src={twitterIcon} alt="Twitter" />
      </a>
      <a href="https://www.linkedin.com/company/navo">
        <img className="sm__ikon" src={linkedinIcon} alt="LinkedIn" />
      </a>
      <a href="https://www.instagram.com/jobbmesse/">
        <img className="sm__ikon" src={instagramIcon} alt="Instagram" />
      </a>
      <a href="https://www.youtube.com/user/NAVnorge">
        <img className="sm__ikon" src={youtubeIcon} alt="Youtube" />
      </a>
    </div>

    <div className="faq__lenke">
      <a className="lenke" href={urlSosialeMedier}>
        Flere sosiale medier
      </a>
    </div>
  </Box>
);

export default SosialeMedier;
