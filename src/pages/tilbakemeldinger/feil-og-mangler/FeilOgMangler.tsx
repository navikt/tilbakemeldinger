import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../../assets/Veileder.svg";
import { Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import InputNavn from "../../../components/input-fields/InputNavn";
import InputTelefon from "../../../components/input-fields/InputTelefon";
import InputMelding from "../../../components/input-fields/InputMelding";
import { postFeilOgMangler } from "../../../clients/apiClient";
import Tilbake from "../../../components/tilbake/Tilbake";
import { HTTPError } from "../../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";
import Header from "../../../components/header/Header";
import { urls } from "Config";
import Box from "../../../components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import InputField from "../../../components/input-fields/InputField";

export interface OutboundFeilOgMangler {
  navn: string;
  telefonnummer: string;
  epost: string;
  feiltype: string;
  melding: string;
}

const FOM = (props: RouteComponentProps) => {
  document.title = "Feil og mangler - www.nav.no";
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const formConfig = {
    navn: {
      isRequired: "Navn er nødvendig"
    },
    epost: {
      isRequired: "E-post er nødvendig",
      isEmail: "Må være en gyldig e-postadresse"
    },
    telefonnummer: {
      isRequired: "Telefonnummer er nødvendig"
    },
    feiltype: {
      isRequired: "Du må velge hvilken type feil eller mangel du fant"
    },
    melding: {
      isRequired: "Melding er nødvendig"
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { navn, telefonnummer, feiltype, melding } = fields;
    const { epost } = fields;

    if (isValid) {
      const outbound = {
        navn,
        epost,
        telefonnummer,
        feiltype,
        melding
      };

      console.log(outbound);
      settLoading(true);
      postFeilOgMangler(outbound)
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
    <div className="pagecontent">
      <Tilbake to={urls.tilbakemeldinger.forside} />
      <Header title="Feil og mangler" />
      <div className={"tb__veileder"}>
        <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
          Takk for at du sier ifra om feil og mangler.
          <br />
          Vi sørger for at meldingen kommer fram til riktig person.
        </Veilederpanel>
      </div>
      <FormValidation onSubmit={send} config={formConfig}>
        {({ errors, fields, submitted, setField, isValid }) => (
          <Box tittel={"Send inn feil og mangler på nav.no"}>
            <InputNavn
              bredde={"M"}
              label={"Navn"}
              value={fields.navn}
              error={errors.navn}
              onChange={v => setField({ navn: v })}
              submitted={submitted}
            />
            <InputField
              bredde={"L"}
              label={"E-post"}
              value={fields.epost}
              error={errors.epost}
              submitted={submitted}
              onChange={v => setField({ epost: v })}
            />
            <InputTelefon
              bredde={"S"}
              label={"Telefon"}
              value={fields.telefonnummer}
              error={errors.telefonnummer}
              onChange={v => setField({ telefonnummer: v })}
              submitted={submitted}
            />
            <SkjemaGruppe
              title={"Hva slags feil eller mangel fant du?"}
              feil={
                submitted && errors.feiltype
                  ? { feilmelding: errors.feiltype }
                  : undefined
              }
            >
              <Radio
                label={"Teknisk feil"}
                name={"TEKNISK_FEIL"}
                checked={fields.feiltype === "TEKNISK_FEIL"}
                onChange={() => setField({ feiltype: "TEKNISK_FEIL" })}
              />
              <Radio
                label={"Feil informasjon"}
                name={"FEIL_INFO"}
                checked={fields.feiltype === "FEIL_INFO"}
                onChange={() => setField({ feiltype: "FEIL_INFO" })}
              />
              <Radio
                label={"Lav grad av universell utforming"}
                name={"UNIVERSELL_UTFORMING"}
                checked={fields.feiltype === "UNIVERSELL_UTFORMING"}
                onChange={() => setField({ feiltype: "UNIVERSELL_UTFORMING" })}
              />
            </SkjemaGruppe>
            <div className="mellomrom">
              <InputMelding
                label={"Melding til NAV"}
                submitted={submitted}
                value={fields.melding}
                error={errors.melding}
                onChange={v => setField({ melding: v })}
              />
            </div>
            {error && (
              <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>
            )}
            <div className="tb__knapper">
              <div className="tb__knapp">
                <Knapp
                  htmlType={"submit"}
                  type={"standard"}
                  disabled={loading || (submitted && !isValid)}
                >
                  {loading ? <NavFrontendSpinner type={"S"} /> : "Send"}
                </Knapp>
              </div>
              <div className="tb__knapp">
                <Link to={urls.tilbakemeldinger.forside}>
                  <Knapp type={"flat"}>Tilbake</Knapp>
                </Link>
              </div>
            </div>
          </Box>
        )}
      </FormValidation>
    </div>
  );
};
export default withRouter(FOM);
