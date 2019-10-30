import React from "react";
import { useStore } from "providers/Provider";
import { Hovedknapp } from "nav-frontend-knapper";
import { Link, Redirect } from "react-router-dom";
import Tilbake from "components/tilbake/Tilbake";
import Environment from "Environments";

import { urls } from "Config";
import Box from "../../../components/box/Box";
import Header from "../../../components/header/Header";
import MetaTags from "react-meta-tags";
import { useIntl } from "react-intl";
const { loginUrl } = Environment();

const Login = () => {
  const [{ auth }] = useStore();
  const intl = useIntl();

  if (auth.authenticated) {
    return <Redirect to={urls.tilbakemeldinger.serviceklage.form} />;
  }

  return (
    <div className="pagecontent">
      <MetaTags>
        <title>{intl.messages["seo.klagepaservice.login.tittel"]}</title>
      </MetaTags>
      <Tilbake to={urls.tilbakemeldinger.forside} />
      <Header title="Klage på service" />
      <Box tittel={"Ønsker du å logge inn?"}>
        <div className="serviceKlage__login-info">
          Vi anbefaler at du logger inn, så slipper du å fylle inn all
          informasjonen om deg selv.
          <br />
          Du må opppgi hvem du er uansett om du logger inn eller ikke.
        </div>
        <div className="tb__knapper">
          <div className={"tb__knapp"}>
            <a href={`${loginUrl}?redirect=${window.location.href}`}>
              <Hovedknapp>Logg inn</Hovedknapp>
            </a>
          </div>
          <div className={"tb__knapp serviceKlage__login-lenke"}>
            <div className="lenke">
              <Link to={urls.tilbakemeldinger.serviceklage.form}>
                Fortsett uten å logge inn
              </Link>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Login;
