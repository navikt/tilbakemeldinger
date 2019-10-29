import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import Box from "components/box/Box";
import { urls } from "../../../Config";
import Lenke from "nav-frontend-lenker";
import { FormattedMessage } from "react-intl";

const Tolketjenesten = () => (
  <Box>
    <div className={"box__section-title"}>
      <Undertittel className="box__title">
        <FormattedMessage id={"kontaktoss.tolketjenesten.tittel"} />
      </Undertittel>
    </div>
    <div className={"box__section-description"}>
      <div className="faq__lenke">
        <Lenke href={urls.tolketjenesten}>
          <FormattedMessage id={"kontaktoss.tolketjenesten.link"} />
        </Lenke>
      </div>
      <div className="faq__lenke">
        <Lenke href={urls.spraktolk}>
          <FormattedMessage id={"kontaktoss.tolketjenesten.link.spraktolk"} />
        </Lenke>
      </div>
    </div>
  </Box>
);

export default Tolketjenesten;
