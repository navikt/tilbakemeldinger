import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import Box from "components/box/Box";
import { Link } from "react-router-dom";
import Environment from "../../../Environments";
const { baseUrl } = Environment();

const tolketjenesten = `${baseUrl}/no/Person/Hjelpemidler/Tjenester+og+produkter/Tolketjenesten`;
const spraktolk = `${baseUrl}/no/Person/Arbeid/Oppfolging+og+tiltak+for+a+komme+i+jobb/Oppfolging+fra+NAV/trenger-du-spr%C3%A5ktolk`;

const Tolketjenesten = () => (
  <Box margin={"0"}>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">Kontakt tolketjenesten</Undertittel>
    </div>
    <div className={"box__section-description"}>
      <div className="faq__lenke">
        <a className="lenke" href={tolketjenesten}>
          Kontakt tolketjenesten for døve, døvblinde og hørselshemmede
        </a>
      </div>
      <div className="faq__lenke">
        <Link className="lenke" to={spraktolk}>
          Språktolk til veiledningssamtaler
        </Link>
      </div>
    </div>
  </Box>
);

export default Tolketjenesten;
