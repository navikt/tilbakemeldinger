import React, { useState } from "react";
import { Hovedknapp } from "nav-frontend-knapper";
import { withRouter, RouteComponentProps } from "react-router-dom";
import InputNavn from "components/input-fields/InputNavn";
import InputTelefon from "components/input-fields/InputTelefon";
import { postSamiskBestillSamtale } from "clients/apiClient";
import { HTTPError } from "components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { FormContext, FormValidation } from "calidation";
import { Normaltekst, Sidetittel } from "nav-frontend-typografi";
import { CheckboksPanelGruppe } from "nav-frontend-skjema";

type TIDSROM = "FORMIDDAG" | "FORMIDDAG" | "BEGGE";
export interface OutboundBestillingAvSamtale {
  fornavn: string;
  etternavn: string;
  telefonnummer: string;
  tidsrom: TIDSROM;
}

const BAS = (props: RouteComponentProps) => {
  document.title = "Bestilling av stamtale - www.nav.no";
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const formConfig = {
    fornavn: {
      isRequired: "Fornavn er påkrevd"
    },
    etternavn: {
      isRequired: "Etternavn er påkrevd"
    },
    telefonnummer: {
      isRequired: "Telefonnummer er påkrevd"
    },
    tidsrom: {
      isRequired: "Tidsrom er påkrevd"
    }
  };

  const initialValues = {
    tidsrom: {
      FORMIDDAG: false,
      ETTERMIDDAG: false
    }
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const { fornavn, etternavn, telefonnummer, tidsrom } = fields;

    if (isValid) {
      const outbound = {
        fornavn,
        etternavn,
        telefonnummer,
        tidsrom: (tidsrom.FORMIDDAG && tidsrom.ETTERMIDDAG
          ? "BEGGE"
          : tidsrom.FORMIDDAG
          ? "FORMIDDAG"
          : "ETTERMIDDAG") as TIDSROM
      };

      console.log(outbound);
      settLoading(true);
      postSamiskBestillSamtale(outbound)
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
      <div className="bestilling-av-samtale pagecontent">
        <FormValidation
          onSubmit={send}
          config={formConfig}
          initialValues={initialValues}
        >
          {({ errors, fields, submitted, setField }) => {
            console.log(fields);
            return (
              <>
                <div className="bestilling-av-samtale__header">
                  <div className="bestilling-av-samtale__tittel">
                    <Sidetittel>
                      Jearaldat bagadallama oažžut sámegillii telefovnnas
                    </Sidetittel>
                  </div>
                  <div className="bestilling-av-samtale__ingress">
                    <Normaltekst className="bestilling-av-samtale__svartid">
                      <p>
                        Diŋgo dás davvisámegilli bálvalusa mas vástiduvvo dutnje
                        sámegillii buot NAV – bálvalusain ja oajuin. Mii
                        veahkehit gávdnat mo du áššiin manná, ja veahkehit du
                        dovdat rivttiid ja geatnegasvuođaid mat leat
                        álbmotoadjolága njuolggadusain. Don gávnnat dieđuid
                        iežat áššis neahttabálvalusas nav.no Ditt NAV. Don
                        sáhtát iskat mii dutnje lea máksojuvvon dás:
                      </p>
                      <p>
                        Don sáhtat ain riŋget NAV-bálvalussii 55 55 33 33 ja
                        dáhtot ahte davvisámegielat bagadalli riŋge dutnje.
                        Muite addit riegadan- ja persunnummara ja maid
                        telefunnummara masa davvisámegielat galga riŋget.
                      </p>
                    </Normaltekst>
                  </div>
                </div>
                <InputNavn
                  label={"Ovdanamma"}
                  value={fields.fornavn}
                  error={errors.fornavn}
                  onChange={v => setField({ fornavn: v })}
                  submitted={submitted}
                />
                <InputNavn
                  label={"Goargu"}
                  value={fields.etternavn}
                  error={errors.etternavn}
                  onChange={v => setField({ etternavn: v })}
                  submitted={submitted}
                />
                <InputTelefon
                  label={"Telefovdna*"}
                  value={fields.telefonnummer}
                  error={errors.telefonnummer}
                  onChange={v => setField({ telefonnummer: v })}
                  submitted={submitted}
                />
                <CheckboksPanelGruppe
                  legend={"Goas heive duinna váldit oktavuođa?"}
                  checkboxes={[
                    {
                      label: "08.00-10.00",
                      value: "FORMIDDAG",
                      checked: fields.tidsrom.FORMIDDAG
                    },
                    {
                      label: "13.30-15.30",
                      value: "ETTERMIDDAG",
                      checked: fields.tidsrom.ETTERMIDDAG
                    }
                  ]}
                  onChange={(e, value?: string) => {
                    if (value) {
                      setField({
                        tidsrom: {
                          ...fields.tidsrom,
                          [value]: !fields.tidsrom[value]
                        }
                      });
                    }
                  }}
                />
                <div>
                  {error && (
                    <AlertStripeFeil>
                      Oi! Noe gikk galt: {error}
                    </AlertStripeFeil>
                  )}
                </div>
                <div className="tb__knapper">
                  <div className="tb__knapp">
                    <Hovedknapp disabled={loading}>
                      {loading ? <NavFrontendSpinner type={"S"} /> : "Send"}
                    </Hovedknapp>
                  </div>
                </div>
              </>
            );
          }}
        </FormValidation>
      </div>
    </>
  );
};
export default withRouter(BAS);
