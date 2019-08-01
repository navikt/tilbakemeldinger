import React from "react";
import VeilederIcon from "../../assets/Veileder.svg";
import Lenke from "nav-frontend-lenker";
import { useStore } from "../../providers/Provider";
import { baseUrl } from "../../App";
import Veilederpanel from "nav-frontend-veilederpanel";
import { Undertittel } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import { Link } from "react-router-dom";
import Tilbake from "../../components/tilbake/Tilbake";
import Environment from "../../utils/Environments";

const { loginUrl } = Environment();

const Login = () => {
  document.title = "Login - www.nav.no";

  const [{ auth }] = useStore();

  if (auth.authenticated) {
    // return <Redirect to={`${baseUrl}/service-klage`} />;
  }

  return (
    <>
      <Tilbake />
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Vi anbefaler at du logger inn. Da trenger du ikke fylle inn like mye
        informasjon.
      </Veilederpanel>
      <div className="serviceKlage__login-content">
        <Undertittel>Ønsker du å logge inn?</Undertittel>
        <div>
          Vi anbefaler at du logger inn, slik at trenger du ikke fylle inn like
          mye informasjon.
        </div>
        <a href={loginUrl}>
          <Hovedknapp>Logg inn</Hovedknapp>
        </a>
        <div className="lenke">
          <Link to={`${baseUrl}/service-klage`}>Forsett uten logg inn</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
