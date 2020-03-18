import { Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import React from "react";

export const TjenesteStengtMelding = () => (
  <div className={"kanal-stengt"}>
    <Element><FormattedMessage id={"tjeneste.stengt"} /></Element>
  </div>
);
