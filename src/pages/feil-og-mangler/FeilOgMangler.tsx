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
import { postFeilOgMangler } from "../../clients/apiClient";
import Tilbake from "../../components/tilbake/Tilbake";
import { HTTPError } from "../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";

export interface OutboundFeilOgMangler {
  navn: string;
  telefonnummer: string;
  feiltype: string;
  melding: string;
}

const FOM = (props: RouteComponentProps) => {
  document.title = "Feil og mangler - www.nav.no";
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const formConfig = {
    navn: {
      isRequired: "Navn er påkrevd"
    },
    telefonnummer: {
      isRequired: "Telefonnummer er påkrevd"
    },
    feiltype: {
      isRequired: "Du må velge hvilken type feil eller mangel du fant"
    },
    melding: {
      isRequired: "Melding er påkrevd"
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { navn, telefonnummer, feiltype, melding } = fields;

    if (isValid) {
      settLoading(true);
      postFeilOgMangler({
        navn,
        telefonnummer,
        feiltype,
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
      {({ errors, fields, submitted, setField }) => (
        <>
          <Tilbake />
          <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
            Takk for at du sier ifra om feil og mangler. Vi sørger for at
            meldingen kommer fram til riktig person.
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
            legend={"Hva slags feil eller mangel fant du? *"}
            radios={[
              { label: "Teknisk feil", value: "teknisk-feil" },
              { label: "Feil informasjon", value: "feil-informasjon" },
              {
                label: "Lav grad av universell utforming",
                value: "universell-utforming"
              }
            ]}
            name={"type-feil"}
            error={errors.feiltype}
            checked={fields.feiltype}
            onChange={v => setField({ feiltype: v })}
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
      )}
    </FormValidation>
  );
};
export default withRouter(FOM);
