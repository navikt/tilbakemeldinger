import React from "react";
import { useStore } from "providers/Provider";
import { Hovedknapp } from "nav-frontend-knapper";
import { Link, Redirect } from "react-router-dom";
import Tilbake from "components/tilbake/Tilbake";
import Environment from "Environments";

import { urls } from "Config";
const { loginUrl } = Environment();

const Login = () => {
  document.title = "Login - www.nav.no";
  const [{ auth }] = useStore();

  if (auth.authenticated) {
    return <Redirect to={`${urls.tilbakemeldinger}/serviceklage`} />;
  }

  return (
    <>
      <div className="pagecontent">
        <Tilbake to={urls.tilbakemeldinger.forside} />
        <div className="serviceKlage__login-info">
          <h2>Ønsker du å logge inn?</h2>
          <div>
            Vi anbefaler at du logger inn, så slipper du å fylle inn all
            informasjonen om deg selv.
            <br />
            Du må opppgi hvem du er uansett om du logger inn eller ikke.
          </div>
        </div>
        <div className="serviceKlage__login-content">
          <a href={`${loginUrl}?redirect=${window.location.href}`}>
            <Hovedknapp>Logg inn</Hovedknapp>
          </a>
          <div className="lenke">
            <Link to={urls.tilbakemeldinger.serviceklage.form}>
              Fortsett uten å logge inn
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
