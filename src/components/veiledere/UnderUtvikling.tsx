import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "assets/Veileder.svg";
import Lenke from "nav-frontend-lenker";
import { urls } from "../../Config";

const UnderUtvikling = () => (
  <Veilederpanel
    svg={<img src={VeilederIcon} alt={"Veileder"} />}
    fargetema={"advarsel"}
  >
    <b>Denne siden er under utvikling.</b>
    <br />
    <div className={"faq__lenke"}>
      <Lenke href={urls.gamleKontaktOss}>
        Gå til de gamle kontakt-oss sidene
      </Lenke>
    </div>
  </Veilederpanel>
);

export default UnderUtvikling;
