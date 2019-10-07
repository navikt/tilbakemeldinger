import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "assets/Veileder.svg";
import RadioPanelGruppe from "components/input-fields/RadioPanelGruppe";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { baseUrl } from "App";
import InputNavn from "components/input-fields/InputNavn";
import InputTelefon from "components/input-fields/InputTelefon";
import InputMelding from "components/input-fields/InputMelding";
import { postFeilOgMangler } from "clients/apiClient";
import Tilbake from "components/tilbake/Tilbake";
import { HTTPError } from "components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";
import Header from "components/header/Header";

export interface OutboundBestillingAvSamtale {
  navn: string;
  telefonnummer: string;
  feiltype: string;
  melding: string;
}

const BAS = (props: RouteComponentProps) => {
  document.title = "Bestilling av stamtale - www.nav.no";
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
      const outbound = {
        navn,
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
    <>
      <Header title="Jearaldat bagadallama oažžut sámegillii telefovnnas" />
      <div className="pagecontent">
        <FormValidation onSubmit={send} config={formConfig}>
          {({ errors, fields, submitted, setField }) => (
            <>
              <Tilbake />
              <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
                <p>
                  Diŋgo dás davvisámegilli bálvalusa mas vástiduvvo dutnje
                  sámegillii buot NAV – bálvalusain ja oajuin. Mii veahkehit
                  gávdnat mo du áššiin manná, ja veahkehit du dovdat rivttiid ja
                  geatnegasvuođaid mat leat álbmotoadjolága njuolggadusain. Don
                  gávnnat dieđuid iežat áššis neahttabálvalusas nav.no Ditt NAV.
                  Don sáhtát iskat mii dutnje lea máksojuvvon dás:
                </p>
                <p>
                  Don sáhtat ain riŋget NAV-bálvalussii 55 55 33 33 ja dáhtot
                  ahte davvisámegielat bagadalli riŋge dutnje. Muite addit
                  riegadan- ja persunnummara ja maid telefunnummara masa
                  davvisámegielat galga riŋget.
                </p>
              </Veilederpanel>
              <div className="flex__rad mellomrom">
                <div className="flex__kolonne-left">
                  <InputNavn
                    label={"Navn"}
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
                legend={"Hva slags feil eller mangel fant du?"}
                radios={[
                  { label: "Teknisk feil", value: "TEKNISK_FEIL" },
                  { label: "Feil informasjon", value: "FEIL_INFO" },
                  {
                    label: "Lav grad av universell utforming",
                    value: "UNIVERSELL_UTFORMING"
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
                  label={"Melding til NAV"}
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
      </div>
    </>
  );
};
export default withRouter(BAS);
