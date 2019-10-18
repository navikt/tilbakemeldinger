import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "assets/Veileder.svg";

const UnderUtvikling = () => (
  <Veilederpanel
    svg={<img src={VeilederIcon} alt={"Veileder"} />}
    fargetema={"advarsel"}
  >
    <b>Denne siden er under utvikling.</b>
    <br />
    Kom gjerne tilbake senere!
  </Veilederpanel>
);

export default UnderUtvikling;
