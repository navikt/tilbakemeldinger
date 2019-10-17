import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import Lenke from "nav-frontend-lenker";

const FAQ = () => (
  <Box icon={VeilederIcon}>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">Nå spør mange om dette</Undertittel>
      </div>
      <div className={"box__section-description"}>
        <Lenke className={"faq__lenke"} href={"#test"}>
          Lorem impsum
        </Lenke>
        <br />
        <Lenke className={"faq__lenke"} href={"#test"}>
          Nulla placerat facilisis arcu
        </Lenke>
        <br />
        <Lenke className={"faq__lenke"} href={"#test"}>
          Pellentesque tristique eget metus sed feugiat.
        </Lenke>
        <br />
        <Lenke className={"faq__lenke"} href={"#test"}>
          Lorem ipsum dolor sit amet
        </Lenke>
        <br />
      </div>
    </div>
    <div className={"box__section"}>
      <div className={"box__section-title"}>
        <Undertittel className="box__title">
          Må min side finner du blant annet
        </Undertittel>
      </div>
      <div className={"box__section-description"}>
        <Lenke className={"faq__lenke"} href={"#test"}>
          Lorem impsum
        </Lenke>
        <br />
        <Lenke className={"faq__lenke"} href={"#test"}>
          Lorem impsum
        </Lenke>
        <br />
      </div>
    </div>
  </Box>
);

export default FAQ;
