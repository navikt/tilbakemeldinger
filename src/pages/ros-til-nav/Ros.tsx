import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import RadioPanelGruppe from "../../components/input-fields/RadioPanelGruppe";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { baseUrl } from "../../App";
import InputNavn from "../../components/input-fields/InputNavn";
import InputTelefon from "../../components/input-fields/InputTelefon";
import InputMelding from "../../components/input-fields/InputMelding";
import { postRosTilNav } from "../../clients/apiClient";
import Tilbake from "../../components/tilbake/Tilbake";
import { HTTPError } from "../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";

export interface OutboundRosTilNav {
  navn: string;
  telefonnummer: string;
  hvemRoses: string;
  melding: string;
}

const Ros = (props: RouteComponentProps) => {
  document.title = "Ros til NAV - www.nav.no";

  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const formConfig = {
    navn: {
      isRequired: "Navn er påkrevd"
    },
    telefonnummer: {
      isRequired: "Telefonnummer er påkrevd"
    },
    hvemRoses: {
      isRequired: "Du må velge hvem du skal gi ros til"
    },
    melding: {
      isRequired: "Melding er påkrevd"
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { navn, telefonnummer, hvemRoses, melding } = fields;

    if (isValid) {
      settLoading(true);
      postRosTilNav({
        navn,
        telefonnummer,
        hvemRoses,
        melding
      })
        .then(() => {
          props.history.push(`${props.location.pathname}/takk`);
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  return (
    <FormValidation onSubmit={send} config={formConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <>
            <Tilbake />
            <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
              Takk for at du vil dele din opplevelse med oss! Vi sørger for at
              rosen kommer fram til riktig person. Unngå å nevne sensitive
              personopplysninger, som for eksempel opplysninger om helseforhold
              eller diagnoser.
            </Veilederpanel>
            <div className="flex__rad mellomrom">
              <div className="flex__kolonne-left">
                <InputNavn
                  value={fields.navn}
                  error={errors.navn}
                  onChange={v => setField({ navn: v })}
                  submitted={submitted}
                />
              </div>
              <div className="flex__kolonne-right">
                <InputTelefon
                  value={fields.telefonnummer}
                  error={errors.telefonnummer}
                  onChange={v => setField({ telefonnummer: v })}
                  submitted={submitted}
                />
              </div>
            </div>
            <RadioPanelGruppe
              legend={"Hvem vil du gi ros til? *"}
              radios={[
                { label: "NAV Kontaktsenter", value: "nav-kontaktsenter" },
                {
                  label: "NAVs digitale løsninger",
                  value: "nav-digitale-losninger"
                },
                { label: "NAV-kontor", value: "nav-kontor" }
              ]}
              name={"ros-til-hvem"}
              checked={fields.hvemRoses}
              error={errors.hvemRoses}
              onChange={v => setField({ hvemRoses: v })}
              submitted={submitted}
            />
            <div className="mellomrom">
              <InputMelding
                label={"Melding til NAV *"}
                submitted={submitted}
                value={fields.melding}
                error={errors.melding}
                onChange={v => setField({ melding: v })}
              />
            </div>
            <div>
              {error && (
                <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>
              )}
            </div>
            <div className="tb__knapper">
              <div className="tb__knapp">
                <Hovedknapp disabled={loading}>
                  {loading ? <NavFrontendSpinner type={"S"} /> : "Send"}
                </Hovedknapp>
              </div>
              <div className="tb__knapp">
                <Link to={baseUrl}>
                  <Knapp>Tilbake</Knapp>
                </Link>
              </div>
            </div>
          </>
        );
      }}
    </FormValidation>
  );
};
export default withRouter(Ros);
