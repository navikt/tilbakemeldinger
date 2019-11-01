import React, { useState } from "react";
import VeilederIcon from "assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import { useStore } from "providers/Provider";
import { Knapp } from "nav-frontend-knapper";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { postServiceKlage } from "clients/apiClient";
import { AlertStripeFeil, AlertStripeInfo } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { HTTPError } from "components/error/Error";
import { FormContext, Form, Validation } from "calidation";
import InputMelding from "components/input-fields/InputMelding";
import {
  ON_BEHALF_OF,
  OutboundServiceKlageBase,
  OutboundServiceKlageExtend
} from "types/serviceklage";
import Header from "components/header/Header";
import { urls } from "Config";
import Box from "components/box/Box";
import { Checkbox, Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";
import ServiceKlagePrivatperson from "./ServiceKlagePrivatperson";
import ServiceKlageForAnnenPerson from "./ServiceKlageAnnenPerson";
import ServiceKlageForBedrift from "./ServiceKlageBedrift";
import ServiceKlageGjelderSosialhjelp from "./ServiceKlageGjelderSosialhjelp";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import ServiceKlageOnskerAaKontaktes from "./ServiceKlageOnskerAaKontaktes";
import Breadcrumbs from "components/breadcrumbs/Breadcrumbs";

export type OutboundServiceKlage = OutboundServiceKlageBase &
  OutboundServiceKlageExtend;

const ServiceKlage = (props: RouteComponentProps) => {
  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState();
  const intl = useIntl();

  const baseFormConfig = {
    klageType: {
      isRequired: intl.formatMessage({ id: "validering.klagetype.pakrevd" })
    },
    hvemFra: {
      isRequired: intl.formatMessage({ id: "validering.klagetype.pakrevd" })
    },
    melding: {
      isRequired: intl.formatMessage({ id: "validering.melding.pakrevd" })
    }
  };

  const initialValues = {
    klageType: []
  };

  const send = (e: FormContext) => {
    const { isValid, fields } = e;
    const hvemFra: ON_BEHALF_OF = fields.hvemFra;
    const { onskerKontakt } = fields;

    if (isValid) {
      const outboundBase: OutboundServiceKlageBase = {
        klagetekst: fields.melding,
        klagetype: fields.klageType,
        ...(fields.klageType.includes("LOKALT_NAV_KONTOR") && {
          gjelderSosialhjelp: fields.gjelderSosialhjelp
        }),
        ...(onskerKontakt && {
          oenskerAaKontaktes: !!onskerKontakt
        })
      };

      const outboundExtend: {
        [key in ON_BEHALF_OF]: OutboundServiceKlageExtend;
      } = {
        PRIVATPERSON: {
          paaVegneAv: "PRIVATPERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            ...(fields.innmelderTlfnr && {
              telefonnummer: fields.innmelderTlfnr
            }),
            personnummer: fields.innmelderFnr
          }
        },
        ANNEN_PERSON: {
          paaVegneAv: "ANNEN_PERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            ...(fields.innmelderTlfnr && {
              telefonnummer: fields.innmelderTlfnr
            }),
            harFullmakt: fields.innmelderHarFullmakt === "true",
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
            ...(fields.onskerKontakt && {
              navn: fields.innmelderNavn,
              telefonnummer: fields.innmelderTlfnr
            }),
            ...(fields.innmelderRolle && {
              rolle: fields.innmelderRolle
            })
          },
          paaVegneAvBedrift: {
            navn: fields.orgNavn,
            ...(fields.onskerKontakt && {
              postadresse: fields.orgPostadr
            }),
            organisasjonsnummer: fields.orgNummer
          }
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundExtend[hvemFra]
      };

      settLoading(true);
      postServiceKlage(outbound)
        .then(() => {
          settSuccess(true);
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
    <div className="pagecontent">
      <Breadcrumbs path={window.location.pathname} />
      <MetaTags>
        <title>{intl.messages["seo.klagepaservice.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["seo.klagepaservice.description"] as string}
        />
      </MetaTags>
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.serviceklage.form.tittel"
        })}
      />
      <div className={"tb__veileder"}>
        <Veilederpanel
          svg={<img src={VeilederIcon} alt="Veileder" />}
          type={"plakat"}
          kompakt={true}
        >
          <div className={"tb__veileder-container"}>
            <FormattedHTMLMessage id="tilbakemeldinger.serviceklage.form.veileder" />
          </div>
        </Veilederpanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <Form onSubmit={send}>
            <Validation config={baseFormConfig} initialValues={initialValues}>
              {({ errors, fields, submitted, setField, isValid }) => {
                const hvemFra: ON_BEHALF_OF = fields.hvemFra;
                const { innmelderHarFullmakt } = fields;
                const kanOnskeAaKontaktes =
                  hvemFra !== "ANNEN_PERSON" || innmelderHarFullmakt !== false;

                const toggleKlageType = (value: string) => {
                  if (fields.klageType.includes(value)) {
                    setField({
                      klageType: fields.klageType.filter(
                        (v: string) => v !== value
                      )
                    });
                  } else {
                    setField({
                      klageType: fields.klageType.concat([value])
                    });
                  }
                };

                return (
                  <div className="skjema__content">
                    <SkjemaGruppe
                      title={intl.formatMessage({ id: "felter.klagetype" })}
                      feil={sjekkForFeil(submitted, errors.klageType)}
                    >
                      <div className={"felter__melding-advarsel"}>
                        <AlertStripeInfo>
                          <FormattedMessage id={"felter.klagetype.info"} />
                        </AlertStripeInfo>
                      </div>
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klageType.telefon"
                        })}
                        name={"TELEFON"}
                        checked={fields.klageType.includes("TELEFON")}
                        onChange={() => toggleKlageType("TELEFON")}
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klageType.navkontor"
                        })}
                        name={"LOKALT_NAV_KONTOR"}
                        checked={fields.klageType.includes("LOKALT_NAV_KONTOR")}
                        onChange={() => toggleKlageType("LOKALT_NAV_KONTOR")}
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klageType.navno"
                        })}
                        name={"NAVNO"}
                        checked={fields.klageType.includes("NAVNO")}
                        onChange={() => toggleKlageType("NAVNO")}
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klageType.brev"
                        })}
                        name={"BREV"}
                        checked={fields.klageType.includes("BREV")}
                        onChange={() => toggleKlageType("BREV")}
                      />
                      <Checkbox
                        label={intl.formatMessage({
                          id: "felter.klageType.annet"
                        })}
                        name={"ANNET"}
                        checked={fields.klageType.includes("ANNET")}
                        onChange={() => toggleKlageType("ANNET")}
                      />
                    </SkjemaGruppe>
                    {fields.klageType.includes("LOKALT_NAV_KONTOR") && (
                      <ServiceKlageGjelderSosialhjelp />
                    )}
                    <SkjemaGruppe
                      title={intl.formatMessage({ id: "felter.hvemfra" })}
                      feil={sjekkForFeil(submitted, errors.hvemFra)}
                    >
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.megselv"
                        })}
                        name={"PRIVATPERSON"}
                        checked={fields.hvemFra === "PRIVATPERSON"}
                        onChange={() => setField({ hvemFra: "PRIVATPERSON" })}
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.enannen"
                        })}
                        name={"ANNEN_PERSON"}
                        checked={fields.hvemFra === "ANNEN_PERSON"}
                        onChange={() => setField({ hvemFra: "ANNEN_PERSON" })}
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.virksomhet"
                        })}
                        name={"BEDRIFT"}
                        checked={fields.hvemFra === "BEDRIFT"}
                        onChange={() => setField({ hvemFra: "BEDRIFT" })}
                      />
                      {hvemFra === "PRIVATPERSON" && (
                        <ServiceKlagePrivatperson />
                      )}
                      {hvemFra === "ANNEN_PERSON" && (
                        <ServiceKlageForAnnenPerson />
                      )}
                      {hvemFra === "BEDRIFT" && <ServiceKlageForBedrift />}
                    </SkjemaGruppe>
                    <div className="serviceKlage__melding">
                      <InputMelding
                        label={intl.formatMessage({
                          id: "felter.melding.tittel"
                        })}
                        submitted={submitted}
                        value={fields.melding}
                        error={errors.melding}
                        onChange={v => setField({ melding: v })}
                      />
                    </div>
                    {kanOnskeAaKontaktes && <ServiceKlageOnskerAaKontaktes />}
                    {error && (
                      <AlertStripeFeil className={"felter__melding-advarsel"}>
                        <FormattedMessage id={"felter.noegikkgalt"} /> {error}
                      </AlertStripeFeil>
                    )}
                    <div className="tb__knapper">
                      <div className="tb__knapp">
                        <Knapp
                          htmlType={"submit"}
                          type={"standard"}
                          disabled={loading || (submitted && !isValid)}
                        >
                          {loading ? (
                            <NavFrontendSpinner type={"S"} />
                          ) : (
                            <FormattedMessage id={"felter.send"} />
                          )}
                        </Knapp>
                      </div>
                      <div className="tb__knapp">
                        <Link to={tilbakeTil}>
                          <Knapp type={"flat"}>
                            <FormattedMessage id={"felter.tilbake"} />
                          </Knapp>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              }}
            </Validation>
          </Form>
        )}
      </Box>
    </div>
  );
};

export default withRouter(ServiceKlage);
