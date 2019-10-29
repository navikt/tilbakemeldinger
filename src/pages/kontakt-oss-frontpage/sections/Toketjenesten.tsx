import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import Box from "components/box/Box";
import { urls } from "../../../Config";
import Lenke from "nav-frontend-lenker";

const Tolketjenesten = () => (
  <Box>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">Kontakt tolketjenesten</Undertittel>
    </div>
    <div className={"box__section-description"}>
      <div className="faq__lenke">
        <Lenke href={urls.tolketjenesten}>
          Kontakt tolketjenesten for døve, døvblinde og hørselshemmede
        </Lenke>
      </div>
      <div className="faq__lenke">
        <Lenke href={urls.spraktolk}>Språktolk til veiledningssamtaler</Lenke>
      </div>
    </div>
  </Box>
);

export default Tolketjenesten;
