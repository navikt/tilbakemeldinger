import React, { useState } from "react";
import VeilederIcon from "../../assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Tilbake from "../../components/tilbake/Tilbake";
import { useStore } from "../../providers/Provider";
import RadioPanelGruppe from "../../components/input-fields/RadioPanelGruppe";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { baseUrl } from "../../App";
import InputFodselsnr from "../../components/input-fields/InputFodselsnr";
import { postServiceKlage } from "../../clients/apiClient";
import InputField from "../../components/input-fields/InputField";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { HTTPError } from "../../components/error/Error";
import { FormContext, Form, Validation } from "calidation";
import InputNavn from "../../components/input-fields/InputNavn";
import InputMelding from "../../components/input-fields/InputMelding";
import InputTelefon from "../../components/input-fields/InputTelefon";
import {
  ON_BEHALF_OF,
  OutboundServiceKlageBase,
  OutboundServiceKlageType,
  OutboundServiceKlageExtend
} from "../../types/serviceklage";
import {
  annenPersFormConfig,
  baseFormConfig,
  bedriftFormConfig,
  privPersFormConfig,
  tlfFormConfig,
  ytelseTjenesteFormConfig
} from "./config/form";
import Header from "../../components/header/Header";

export type OutboundServiceKlage = OutboundServiceKlageBase &
  OutboundServiceKlageType &
  OutboundServiceKlageExtend;

const ServiceKlage = (props: RouteComponentProps) => {
  document.title = "ServiceKlage - www.nav.no";

  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const hvemFra: ON_BEHALF_OF = fields.hvemFra;

    if (isValid) {
      const outboundBase: OutboundServiceKlageBase = {
        klagetekst: fields.melding,
        oenskerAaKontaktes: fields.onskerKontakt === "true" ? true : false
      };

      const outboundType: OutboundServiceKlageType =
        fields.klageType === "SAKSBEHANDLING"
          ? {
              klagetype: fields.klageType,
              ytelseTjeneste: fields.ytelseTjeneste
            }
          : {
              klagetype: fields.klageType
            };

      const outboundExtend: {
        [key in ON_BEHALF_OF]: OutboundServiceKlageExtend;
      } = {
        PRIVATPERSON: {
          paaVegneAv: "PRIVATPERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            telefonnummer: fields.innmelderTlfnr,
            personnummer: fields.innmelderFnr
          }
        },
        ANNEN_PERSON: {
          paaVegneAv: "ANNEN_PERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            telefonnummer: fields.innmelderTlfnr,
            harFullmakt: fields.innmelderHarFullmakt === "true" ? true : false,
            rolle: fields.innmelderRolle
          },
          paaVegneAvPerson: {
            navn: fields.paaVegneAvNavn,
            personnummer: fields.paaVegneAvFodselsnr
          }
        },
        BEDRIFT: {
          paaVegneAv: "BEDRIFT",
          innmelder: {
            navn: fields.innmelderNavn,
            telefonnummer: fields.innmelderTlfnr,
            rolle: fields.innmelderRolle
          },
          paaVegneAvBedrift: {
            navn: fields.orgNavn,
            postadresse: fields.orgPostadr,
            organisasjonsnummer: fields.orgNummer,
            telefonnummer: fields.orgTlfNr
          }
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundType,
        ...outboundExtend[hvemFra]
      };

      console.log(outbound);
      settLoading(true);
      postServiceKlage(outbound)
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
      <Header title="Tilbakemelding på service" />
      <div className="pagecontent">
        <Form onSubmit={send}>
          <Validation config={baseFormConfig}>
            {({ errors, fields, submitted, setField }) => {
              const hvemFra: ON_BEHALF_OF = fields.hvemFra;
              return (
                <>
                  <Tilbake
                    to={auth.authenticated ? "" : "/service-klage/login"}
                  />
                  <Veilederpanel
                    svg={<img src={VeilederIcon} alt="Veileder" />}
                  >
                    Takk for at du vil dele din opplevelse med oss! Vi sørger
                    for at rosen kommer fram til riktig person. Unngå å nevne
                    sensitive personopplysninger, som for eksempel opplysninger
                    om helseforhold eller diagnoser.
                  </Veilederpanel>
                  <div className="serviceKlage__content">
                    <RadioPanelGruppe
                      legend={"Hva gjelder tilbakemeldingen?"}
                      radios={[
                        {
                          label: "Saksbehandling av søknad",
                          value: "SAKSBEHANDLING"
                        },
                        { label: "NAV-kontor", value: "NAV_KONTOR" },
                        { label: "Telefon", value: "TELEFON" },
                        { label: "nav.no", value: "NAVNO" },
                        { label: "Annet", value: "ANNET" }
                      ]}
                      name={"hva-gjelder-tilbakemeldingen"}
                      error={errors.klageType}
                      checked={fields.klageType}
                      onChange={v => setField({ klageType: v })}
                      submitted={submitted}
                    />
                    {fields.klageType === "SAKSBEHANDLING" && (
                      <Validation key="yt" config={ytelseTjenesteFormConfig}>
                        {() => (
                          <div className="serviceKlage__ekspandert">
                            <InputField
                              label={"Ytelse eller tjeneste (valgfritt)"}
                              value={fields.ytelseTjeneste}
                              error={errors.ytelseTjeneste}
                              onChange={v => setField({ ytelseTjeneste: v })}
                              submitted={submitted}
                            />
                          </div>
                        )}
                      </Validation>
                    )}
                    <RadioPanelGruppe
                      legend={"Hvem skriver du på vegne av?"}
                      radios={[
                        {
                          label: "Meg selv som privatperson",
                          value: "PRIVATPERSON" as ON_BEHALF_OF
                        },
                        {
                          label: "På vegne av en annen privatperson",
                          value: "ANNEN_PERSON" as ON_BEHALF_OF
                        },
                        {
                          label: "På vegne av en bedrift",
                          value: "BEDRIFT" as ON_BEHALF_OF
                        }
                      ]}
                      name={"hvem-fra"}
                      error={errors.hvemFra}
                      checked={fields.hvemFra}
                      onChange={v => setField({ hvemFra: v })}
                      submitted={submitted}
                    />
                    {hvemFra && (
                      <div className="serviceKlage__ekspandert">
                        {
                          {
                            PRIVATPERSON: (
                              <Validation
                                config={privPersFormConfig}
                                key={hvemFra}
                              >
                                {() => (
                                  <>
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left">
                                        <InputNavn
                                          value={fields.innmelderNavn}
                                          error={errors.innmelderNavn}
                                          onChange={v =>
                                            setField({ innmelderNavn: v })
                                          }
                                          submitted={submitted}
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputFodselsnr
                                          onChange={v =>
                                            setField({ innmelderFnr: v })
                                          }
                                          value={fields.innmelderFnr}
                                          submitted={submitted}
                                        />
                                      </div>
                                    </div>
                                  </>
                                )}
                              </Validation>
                            ),
                            ANNEN_PERSON: (
                              <Validation
                                key={hvemFra}
                                config={annenPersFormConfig}
                              >
                                {() => (
                                  <div>
                                    <div>
                                      <div className="flex__rad">
                                        <div className="flex__kolonne-left">
                                          <InputNavn
                                            value={fields.innmelderNavn}
                                            error={errors.innmelderNavn}
                                            onChange={v =>
                                              setField({ innmelderNavn: v })
                                            }
                                            submitted={submitted}
                                          />
                                        </div>
                                        <div className="flex__kolonne-right">
                                          <InputField
                                            label={
                                              "Din rolle (nær pårørende, behandler e.l.)"
                                            }
                                            required={true}
                                            value={fields.innmelderRolle}
                                            error={errors.innmelderRolle}
                                            onChange={v =>
                                              setField({ innmelderRolle: v })
                                            }
                                            submitted={submitted}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="divider" />
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left">
                                        <InputField
                                          label={"På vegne av"}
                                          required={true}
                                          value={fields.paaVegneAvNavn}
                                          error={errors.paaVegneAvNavn}
                                          onChange={v =>
                                            setField({ paaVegneAvNavn: v })
                                          }
                                          submitted={submitted}
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputField
                                          label={"Fødselsnummer"}
                                          required={true}
                                          value={fields.paaVegneAvFodselsnr}
                                          error={errors.paaVegneAvFodselsnr}
                                          onChange={v =>
                                            setField({ paaVegneAvFodselsnr: v })
                                          }
                                          submitted={submitted}
                                        />
                                      </div>
                                    </div>
                                    <RadioPanelGruppe
                                      legend={"Har du fullmakt?"}
                                      className="radioPanel__bool"
                                      radios={[
                                        {
                                          label: "Ja, jeg har fullmakt",
                                          value: "true"
                                        },
                                        {
                                          label: "Nei, jeg har ikke fullmakt",
                                          value: "false"
                                        }
                                      ]}
                                      name={"fullmakt"}
                                      checked={fields.innmelderHarFullmakt}
                                      error={errors.innmelderHarFullmakt}
                                      onChange={v =>
                                        setField({ innmelderHarFullmakt: v })
                                      }
                                      submitted={submitted}
                                    />
                                  </div>
                                )}
                              </Validation>
                            ),
                            BEDRIFT: (
                              <Validation
                                key={hvemFra}
                                config={bedriftFormConfig}
                              >
                                {() => (
                                  <>
                                    <div>
                                      <div className="flex__rad">
                                        <div className="flex__kolonne-left">
                                          <InputNavn
                                            value={fields.innmelderNavn}
                                            error={errors.innmelderNavn}
                                            onChange={v =>
                                              setField({ innmelderNavn: v })
                                            }
                                            submitted={submitted}
                                          />
                                        </div>
                                        <div className="flex__kolonne-right">
                                          <InputFodselsnr
                                            onChange={v =>
                                              setField({ innmelderFnr: v })
                                            }
                                            value={fields.innmelderFnr}
                                            submitted={submitted}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div className="divider" />
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left ">
                                        <InputField
                                          label={"Organisasjonsnavn"}
                                          required={true}
                                          value={fields.orgNavn}
                                          error={errors.orgNavn}
                                          onChange={v =>
                                            setField({ orgNavn: v })
                                          }
                                          submitted={submitted}
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputField
                                          label={"Organisasjonsnummer"}
                                          required={true}
                                          value={fields.orgNummer}
                                          error={errors.orgNummer}
                                          onChange={v =>
                                            setField({ orgNummer: v })
                                          }
                                          submitted={submitted}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex__rad">
                                      <div className="flex__kolonne-left">
                                        <InputField
                                          label={"Bedriftens postadresse"}
                                          required={true}
                                          value={fields.orgPostadr}
                                          error={errors.orgPostadr}
                                          onChange={v =>
                                            setField({ orgPostadr: v })
                                          }
                                          submitted={submitted}
                                        />
                                      </div>
                                      <div className="flex__kolonne-right">
                                        <InputField
                                          label={"Bedriftens telefonnummer"}
                                          required={true}
                                          value={fields.orgTlfNr}
                                          error={errors.orgTlfNr}
                                          onChange={v =>
                                            setField({ orgTlfNr: v })
                                          }
                                          submitted={submitted}
                                        />
                                      </div>
                                    </div>
                                    <InputField
                                      label={
                                        "Din rolle (leder, HR-ansvarlig, tillitsvalgt osv.)"
                                      }
                                      required={true}
                                      value={fields.innmelderRolle}
                                      error={errors.innmelderRolle}
                                      onChange={v =>
                                        setField({ innmelderRolle: v })
                                      }
                                      submitted={submitted}
                                    />
                                  </>
                                )}
                              </Validation>
                            )
                          }[hvemFra]
                        }
                      </div>
                    )}
                    <div className="serviceKlage__melding">
                      <InputMelding
                        label={"Melding til NAV"}
                        submitted={submitted}
                        value={fields.melding}
                        error={errors.melding}
                        onChange={v => setField({ melding: v })}
                      />
                    </div>
                    <RadioPanelGruppe
                      legend={"Ønsker du at vi kontakter deg?"}
                      className="radioPanel__bool"
                      radios={[
                        {
                          label: "Ja, jeg ønsker å kontaktes",
                          value: "true"
                        },
                        {
                          label: "Nei, jeg ville bare si ifra",
                          value: "false"
                        }
                      ]}
                      name={"onsker-kontakt"}
                      error={errors.onskerKontakt}
                      checked={fields.onskerKontakt}
                      onChange={v => setField({ onskerKontakt: v })}
                      submitted={submitted}
                    />
                    {fields.onskerKontakt === "true" && (
                      <Validation key="kontakt" config={tlfFormConfig}>
                        {() => (
                          <div className="serviceKlage__ekspandert">
                            <InputTelefon
                              value={fields.innmelderTlfnr}
                              error={errors.innmelderTlfnr}
                              onChange={v => setField({ innmelderTlfnr: v })}
                              submitted={submitted}
                            />
                          </div>
                        )}
                      </Validation>
                    )}
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
                      <div className="tb__knapp">
                        <Link to={baseUrl}>
                          <Knapp>Tilbake</Knapp>
                        </Link>
                      </div>
                    </div>
                  </div>
                </>
              );
            }}
          </Validation>
        </Form>
      </div>
    </>
  );
};

export default withRouter(ServiceKlage);
