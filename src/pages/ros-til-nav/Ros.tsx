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
import { Element } from "nav-frontend-typografi";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, Form, Validation } from "calidation";
import Select from "react-select";
import { ValueType } from "react-select/src/types";

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

  const navKontorConfig = {
    navKontor: {
      isRequired: "NAV-kontor er påkrevd"
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
    <Form onSubmit={send}>
      <Validation config={formConfig}>
        {({ errors, fields, submitted, setField }) => {
          console.log(errors);
          console.log(fields);
          return (
            <>
              <Tilbake />
              <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
                Takk for at du vil dele din opplevelse med oss! Vi sørger for at
                rosen kommer fram til riktig person. Unngå å nevne sensitive
                personopplysninger, som for eksempel opplysninger om
                helseforhold eller diagnoser.
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
                  { label: "NAV Kontaktsenter", value: "NAV_KONTAKTSENTER" },
                  {
                    label: "NAVs digitale løsninger",
                    value: "NAV_DIGITALE_LOSNINGER"
                  },
                  { label: "NAV-kontor", value: "NAV_KONTOR" }
                ]}
                name={"ros-til-hvem"}
                checked={fields.hvemRoses}
                error={errors.hvemRoses}
                onChange={v => setField({ hvemRoses: v })}
                submitted={submitted}
              />
              {fields.hvemRoses === "NAV_KONTOR" && (
                <Validation config={navKontorConfig}>
                  {() => {
                    return (
                      <>
                        <div className="ros-til-nav__label">
                          <Element>Velg NAV-kontor</Element>
                        </div>
                        <Select
                          classNamePrefix={
                            submitted && errors.navKontor
                              ? "ros-til-nav-feil"
                              : "ros-til-nav"
                          }
                          value={fields.navKontor}
                          onChange={(
                            v: ValueType<{ value: string; label: string }>
                          ) => setField({ navKontor: v })}
                          options={[
                            { value: "chocolate", label: "Chocolate" },
                            { value: "strawberry", label: "Strawberry" },
                            { value: "vanilla", label: "Vanilla" }
                          ]}
                        />
                        {submitted && errors.navKontor && (
                          <div role="alert" aria-live="assertive">
                            <div className="skjemaelement__feilmelding">
                              {errors.navKontor}
                            </div>
                          </div>
                        )}
                      </>
                    );
                  }}
                </Validation>
              )}
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
      </Validation>
    </Form>
  );
};
export default withRouter(Ros);
