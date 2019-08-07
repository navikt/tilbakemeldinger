import React from "react";
import VeilederIcon from "../../assets/Veileder.svg";
import { useStore } from "../../providers/Provider";
import { baseUrl } from "../../App";
import Veilederpanel from "nav-frontend-veilederpanel";
import { Undertittel } from "nav-frontend-typografi";
import { Hovedknapp } from "nav-frontend-knapper";
import { Link, Redirect } from "react-router-dom";
import Tilbake from "../../components/tilbake/Tilbake";
import Environment from "../../utils/Environments";
import Header from "../../components/header/Header";

const { loginUrl } = Environment();

const Login = () => {
  document.title = "Login - www.nav.no";
  const [{ auth }] = useStore();

  if (auth.authenticated) {
    return <Redirect to={`${baseUrl}/service-klage`} />;
  }

  return (
    <>
      <Header title="Login - Tilbakemelding på service" />
      <div className="pagecontent">
        <Tilbake />
        <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
          Ønsker du å logge inn? <br /> Vi anbefaler at du logger inn, så
          slipper du å fylle inn all informasjonen om deg selv.
        </Veilederpanel>
        <div className="serviceKlage__login-content">
          <a href={`${loginUrl}?redirect=${window.location.href}`}>
            <Hovedknapp>Logg inn</Hovedknapp>
          </a>
          <div className="lenke">
            <Link to={`${baseUrl}/service-klage`}>
              Fortsett uten å logge inn
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
