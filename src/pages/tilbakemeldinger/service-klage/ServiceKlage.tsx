import React, { useState } from "react";
import VeilederIcon from "assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Tilbake from "components/tilbake/Tilbake";
import { useStore } from "providers/Provider";
import RadioPanelGruppe from "components/input-fields/RadioPanelGruppe";
import { Knapp } from "nav-frontend-knapper";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import InputFodselsnr from "components/input-fields/InputFodselsnr";
import { postServiceKlage } from "clients/apiClient";
import InputField from "components/input-fields/InputField";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { HTTPError } from "components/error/Error";
import { FormContext, Form, Validation } from "calidation";
import InputNavn from "components/input-fields/InputNavn";
import InputMelding from "components/input-fields/InputMelding";
import InputTelefon from "components/input-fields/InputTelefon";
import {
  ON_BEHALF_OF,
  OutboundServiceKlageBase,
  OutboundServiceKlageType,
  OutboundServiceKlageExtend
} from "types/serviceklage";
import {
  annenPersFormConfig,
  baseFormConfig,
  bedriftFormConfig,
  privPersFormConfig,
  tlfFormConfig,
  ytelseTjenesteFormConfig
} from "./config/form";
import Header from "components/header/Header";
import { urls } from "Config";
import Box from "../../../components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { useIntl } from "react-intl";
import MetaTags from "react-meta-tags";

export type OutboundServiceKlage = OutboundServiceKlageBase &
  OutboundServiceKlageType &
  OutboundServiceKlageExtend;

const ServiceKlage = (props: RouteComponentProps) => {
  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();
  const intl = useIntl();

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

  const tilbakeTil = auth.authenticated
    ? urls.tilbakemeldinger.forside
    : urls.tilbakemeldinger.serviceklage.login;

  return (
    <>
      <div className="pagecontent">
        <MetaTags>
          <title>{intl.messages["seo.klagepaservice.tittel"]}</title>
          <meta
            name="description"
            content={intl.messages["seo.klagepaservice.description"] as string}
          />
        </MetaTags>
        <Tilbake to={tilbakeTil} />
        <Header title="Klage på service" />
        <div className={"tb__veileder"}>
          <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
            Velg det alternativet som passer best.
            <br />
            Vi vil uansett sørge for at tilbakemeldingen kommer fram til riktig
            person.
          </Veilederpanel>
        </div>
        <Form onSubmit={send}>
          <Validation config={baseFormConfig}>
            {({ errors, fields, submitted, setField, isValid }) => {
              const hvemFra: ON_BEHALF_OF = fields.hvemFra;
              return (
                <Box>
                  <div className="serviceKlage__content">
                    <SkjemaGruppe
                      title={"Hva gjelder tilbakemeldingen?"}
                      feil={
                        submitted && errors.klageType
                          ? { feilmelding: errors.klageType }
                          : undefined
                      }
                    >
                      <Radio
                        label={"Saksbehandling av søknad"}
                        name={"SAKSBEHANDLING"}
                        checked={fields.klageType === "SAKSBEHANDLING"}
                        onChange={() =>
                          setField({ klageType: "SAKSBEHANDLING" })
                        }
                      />
                      {fields.klageType === "SAKSBEHANDLING" && (
                        <Validation key="yt" config={ytelseTjenesteFormConfig}>
                          {() => (
                            <div className="serviceKlage__ekspandert">
                              <InputField
                                bredde={"L"}
                                label={"Type søknad (valgfritt)"}
                                value={fields.ytelseTjeneste}
                                error={errors.ytelseTjeneste}
                                onChange={v => setField({ ytelseTjeneste: v })}
                                submitted={submitted}
                              />
                            </div>
                          )}
                        </Validation>
                      )}
                      <Radio
                        label={"NAV-kontor"}
                        name={"NAV_KONTOR"}
                        checked={fields.klageType === "NAV_KONTOR"}
                        onChange={() => setField({ klageType: "NAV_KONTOR" })}
                      />
                      <Radio
                        label={"Telefon"}
                        name={"TELEFON"}
                        checked={fields.klageType === "TELEFON"}
                        onChange={() => setField({ klageType: "TELEFON" })}
                      />
                      <Radio
                        label={"nav.no"}
                        name={"NAVNO"}
                        checked={fields.klageType === "NAVNO"}
                        onChange={() => setField({ klageType: "NAVNO" })}
                      />
                      <Radio
                        label={"Annet"}
                        name={"ANNET"}
                        checked={fields.klageType === "ANNET"}
                        onChange={() => setField({ klageType: "ANNET" })}
                      />
                    </SkjemaGruppe>
                    <SkjemaGruppe
                      title={"Hvem skriver du på vegne av?"}
                      feil={
                        submitted && errors.hvemFra
                          ? { feilmelding: errors.hvemFra }
                          : undefined
                      }
                    >
                      <Radio
                        label={"Meg selv som privatperson"}
                        name={"PRIVATPERSON"}
                        checked={fields.hvemFra === "PRIVATPERSON"}
                        onChange={() => setField({ hvemFra: "PRIVATPERSON" })}
                      />
                      {hvemFra === "PRIVATPERSON" && (
                        <Validation key={hvemFra} config={privPersFormConfig}>
                          {() => (
                            <div className="serviceKlage__ekspandert">
                              <InputNavn
                                bredde={"L"}
                                label={"Navn"}
                                submitted={submitted}
                                value={fields.innmelderNavn}
                                error={errors.innmelderNavn}
                                onChange={v => setField({ innmelderNavn: v })}
                              />
                              <InputFodselsnr
                                bredde={"M"}
                                submitted={submitted}
                                error={errors.innmelderFnr}
                                value={fields.innmelderFnr}
                                onChange={v => setField({ innmelderFnr: v })}
                              />
                            </div>
                          )}
                        </Validation>
                      )}
                      <Radio
                        label={"På vegne av en annen privatperson"}
                        name={"ANNEN_PERSON"}
                        checked={fields.hvemFra === "ANNEN_PERSON"}
                        onChange={() => setField({ hvemFra: "ANNEN_PERSON" })}
                      />
                      {hvemFra === "ANNEN_PERSON" && (
                        <Validation key={hvemFra} config={annenPersFormConfig}>
                          {() => (
                            <div className="serviceKlage__ekspandert">
                              <InputNavn
                                bredde={"L"}
                                label={"Ditt navn"}
                                submitted={submitted}
                                value={fields.innmelderNavn}
                                error={errors.innmelderNavn}
                                onChange={v => setField({ innmelderNavn: v })}
                              />
                              <InputField
                                bredde={"M"}
                                submitted={submitted}
                                label={
                                  "Din rolle (nær pårørende, behandler e.l.)"
                                }
                                required={true}
                                value={fields.innmelderRolle}
                                error={errors.innmelderRolle}
                                onChange={v => setField({ innmelderRolle: v })}
                              />
                              <InputField
                                bredde={"L"}
                                label={"Navn til den som klager"}
                                submitted={submitted}
                                value={fields.paaVegneAvNavn}
                                error={errors.paaVegneAvNavn}
                                onChange={v => setField({ paaVegneAvNavn: v })}
                              />
                              <InputField
                                bredde={"S"}
                                label={"Fødselsnummer til den som klager"}
                                submitted={submitted}
                                value={fields.paaVegneAvFodselsnr}
                                error={errors.paaVegneAvFodselsnr}
                                onChange={v =>
                                  setField({ paaVegneAvFodselsnr: v })
                                }
                              />
                              <div className={"serviceKlage__fullmakt"}>
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
                                  submitted={submitted}
                                  checked={fields.innmelderHarFullmakt}
                                  error={errors.innmelderHarFullmakt}
                                  onChange={v =>
                                    setField({ innmelderHarFullmakt: v })
                                  }
                                />
                              </div>
                            </div>
                          )}
                        </Validation>
                      )}
                      <Radio
                        label={"På vegne av en virksomhet"}
                        name={"BEDRIFT"}
                        checked={fields.hvemFra === "BEDRIFT"}
                        onChange={() => setField({ hvemFra: "BEDRIFT" })}
                      />
                      {hvemFra === "BEDRIFT" && (
                        <Validation key={hvemFra} config={bedriftFormConfig}>
                          {() => (
                            <div className="serviceKlage__ekspandert">
                              <InputNavn
                                bredde={"M"}
                                label={"Ditt navn"}
                                submitted={submitted}
                                value={fields.innmelderNavn}
                                error={errors.innmelderNavn}
                                onChange={v => setField({ innmelderNavn: v })}
                              />
                              <InputField
                                bredde={"M"}
                                label={
                                  "Din rolle (leder, HR-ansvarlig, tillitsvalgt osv.)"
                                }
                                submitted={submitted}
                                value={fields.innmelderRolle}
                                error={errors.innmelderRolle}
                                onChange={v => setField({ innmelderRolle: v })}
                              />
                              <InputField
                                bredde={"M"}
                                label={"Organisasjonsnavn"}
                                submitted={submitted}
                                value={fields.orgNavn}
                                error={errors.orgNavn}
                                onChange={v => setField({ orgNavn: v })}
                              />
                              <InputField
                                bredde={"M"}
                                label={"Organisasjonsnummer"}
                                submitted={submitted}
                                value={fields.orgNummer}
                                error={errors.orgNummer}
                                onChange={v => setField({ orgNummer: v })}
                              />
                              <InputField
                                bredde={"L"}
                                label={"Bedriftens postadresse"}
                                submitted={submitted}
                                value={fields.orgPostadr}
                                error={errors.orgPostadr}
                                onChange={v => setField({ orgPostadr: v })}
                              />
                              <InputField
                                bredde={"S"}
                                label={"Bedriftens telefonnummer"}
                                submitted={submitted}
                                value={fields.orgTlfNr}
                                error={errors.orgTlfNr}
                                onChange={v => setField({ orgTlfNr: v })}
                              />
                            </div>
                          )}
                        </Validation>
                      )}
                    </SkjemaGruppe>
                    <div className="serviceKlage__melding">
                      <InputMelding
                        label={"Skriv din tilbakemelding her"}
                        submitted={submitted}
                        value={fields.melding}
                        error={errors.melding}
                        onChange={v => setField({ melding: v })}
                      />
                    </div>
                    <SkjemaGruppe
                      title={"Ønsker du at vi kontakter deg?"}
                      feil={
                        submitted && errors.onskerKontakt
                          ? { feilmelding: errors.onskerKontakt }
                          : undefined
                      }
                    >
                      <Radio
                        label={"Ja, jeg ønsker å kontaktes"}
                        name={"Ja, jeg ønsker å kontaktes"}
                        checked={fields.onskerKontakt === "true"}
                        onChange={() => setField({ onskerKontakt: "true" })}
                      />
                      {fields.onskerKontakt === "true" && (
                        <Validation key="kontakt" config={tlfFormConfig}>
                          {() => (
                            <div className="serviceKlage__ekspandert">
                              <InputTelefon
                                bredde={"S"}
                                label={"Telefon"}
                                value={fields.innmelderTlfnr}
                                error={errors.innmelderTlfnr}
                                onChange={v => setField({ innmelderTlfnr: v })}
                                submitted={submitted}
                              />
                            </div>
                          )}
                        </Validation>
                      )}
                      <Radio
                        label={"Nei, jeg ville bare si ifra"}
                        name={"Nei, jeg ville bare si ifra"}
                        checked={fields.onskerKontakt === "false"}
                        onChange={() => setField({ onskerKontakt: "false" })}
                      />
                    </SkjemaGruppe>
                    {error && (
                      <AlertStripeFeil>
                        Oi! Noe gikk galt: {error}
                      </AlertStripeFeil>
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
                        <Link to={tilbakeTil}>
                          <Knapp type={"flat"}>Tilbake</Knapp>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Box>
              );
            }}
          </Validation>
        </Form>
      </div>
    </>
  );
};

export default withRouter(ServiceKlage);
