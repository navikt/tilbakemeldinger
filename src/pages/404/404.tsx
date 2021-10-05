import React from "react";
import ReactMetaTags from "react-meta-tags";
import { Systemtittel } from "nav-frontend-typografi";
import { forsidePath } from "../../Config";
import { FormattedMessage } from "react-intl";
import Lenke from "nav-frontend-lenker";

const NotFound = () => (
  <>
    <ReactMetaTags>
      <meta name="robots" content="noindex" />
    </ReactMetaTags>
    <div className="notfound__container">
      <Systemtittel>
        <FormattedMessage id={"feil.404"} />
      </Systemtittel>
      <Lenke href={forsidePath}>
        <FormattedMessage id={"feil.lenke"} />
      </Lenke>
    </div>
  </>
);

export default NotFound;
