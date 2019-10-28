import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import { urls } from "../../../Config";
const urlSosialeMedier = urls.sosialeMedier;
/*
import facebookIcon from "assets/icons/line/line-version-logo-facebook.svg";
import twitterIcon from "assets/icons/line/line-version-logo-twitter-bird.svg";
import linkedinIcon from "assets/icons/line/line-version-logo-linkedin.svg";
import instagramIcon from "assets/icons/line/line-version-logo-instagram.svg";
import youtubeIcon from "assets/icons/line/line-version-logo-youtube-clip.svg";
*/

const SosialeMedier = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">NAV i sosiale medier</Undertittel>
    </div>
    <div className={"box__section-description"}>
      Du treffer oss på Facebook. Twitter, Linkedin, Instagram, og Youtube
    </div>
    {/*
    <div>
      <img className="sm__ikon" src={facebookIcon} alt="Facebook" />
      <img className="sm__ikon" src={twitterIcon} alt="Twitter" />
      <img className="sm__ikon" src={linkedinIcon} alt="LinkedIn" />
      <img className="sm__ikon" src={instagramIcon} alt="Instagram" />
      <img className="sm__ikon" src={youtubeIcon} alt="Youtube" />
    </div>
    */}
    <div className="faq__lenke">
      <a className="lenke" href={urlSosialeMedier}>
        Se hvor du finner oss
      </a>
    </div>
  </Box>
);

export default SosialeMedier;
