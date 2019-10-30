import React, { useState } from "react";
import VeilederIcon from "assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Tilbake from "components/tilbake/Tilbake";
import { useStore } from "providers/Provider";
import { Knapp } from "nav-frontend-knapper";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { postServiceKlage } from "clients/apiClient";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { HTTPError } from "components/error/Error";
import { FormContext, Form, Validation } from "calidation";
import InputMelding from "components/input-fields/InputMelding";
import {
  ON_BEHALF_OF,
  OutboundServiceKlageBase,
  OutboundServiceKlageType,
  OutboundServiceKlageExtend
} from "types/serviceklage";
import Header from "components/header/Header";
import { urls } from "Config";
import Box from "../../../components/box/Box";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { FormattedHTMLMessage, FormattedMessage, useIntl } from "react-intl";
import MetaTags from "react-meta-tags";
import ServiceKlagePrivatperson from "./ServicecKlagePrivatperson";
import ServiceKlageForAnnenPerson from "./ServicecKlageAnnenPerson";
import ServiceKlageForBedrift from "./ServicecKlageBedrift";
import ServiceKlageYtelse from "./ServicecKlageYtelse";
import ServiceKlageTelefon from "./ServicecKlageTelefon";
import Takk from "../../../components/takk/Takk";
import { sjekkForFeil } from "../../../utils/validators";

export type OutboundServiceKlage = OutboundServiceKlageBase &
  OutboundServiceKlageType &
  OutboundServiceKlageExtend;

const ServiceKlage = (props: RouteComponentProps) => {
  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(true);
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
    },
    onskerKontakt: {
      isRequired: intl.formatMessage({ id: "validering.onskerkontakt.pakrevd" })
    }
  };

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
      <MetaTags>
        <title>{intl.messages["seo.klagepaservice.tittel"]}</title>
        <meta
          name="description"
          content={intl.messages["seo.klagepaservice.description"] as string}
        />
      </MetaTags>
      <Tilbake to={tilbakeTil} />
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.serviceklage.form.tittel"
        })}
      />
      <div className={"tb__veileder"}>
        <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
          <FormattedHTMLMessage id="tilbakemeldinger.serviceklage.form.veileder" />
        </Veilederpanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <Form onSubmit={send}>
            <Validation config={baseFormConfig}>
              {({ errors, fields, submitted, setField, isValid }) => {
                const hvemFra: ON_BEHALF_OF = fields.hvemFra;
                return (
                  <div className="serviceKlage__content">
                    <SkjemaGruppe
                      title={intl.formatMessage({ id: "felter.klagetype" })}
                      feil={sjekkForFeil(submitted, errors.klageType)}
                    >
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.klageType.saksbehandling"
                        })}
                        name={"SAKSBEHANDLING"}
                        checked={fields.klageType === "SAKSBEHANDLING"}
                        onChange={() =>
                          setField({ klageType: "SAKSBEHANDLING" })
                        }
                      />
                      {fields.klageType === "SAKSBEHANDLING" && (
                        <ServiceKlageYtelse />
                      )}
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.klageType.navkontor"
                        })}
                        name={"NAV_KONTOR"}
                        checked={fields.klageType === "NAV_KONTOR"}
                        onChange={() => setField({ klageType: "NAV_KONTOR" })}
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.klageType.telefon"
                        })}
                        name={"TELEFON"}
                        checked={fields.klageType === "TELEFON"}
                        onChange={() => setField({ klageType: "TELEFON" })}
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.klageType.navno"
                        })}
                        name={"NAVNO"}
                        checked={fields.klageType === "NAVNO"}
                        onChange={() => setField({ klageType: "NAVNO" })}
                      />
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.klageType.annet"
                        })}
                        name={"ANNET"}
                        checked={fields.klageType === "ANNET"}
                        onChange={() => setField({ klageType: "ANNET" })}
                      />
                    </SkjemaGruppe>
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
                      {hvemFra === "PRIVATPERSON" && (
                        <ServiceKlagePrivatperson />
                      )}
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.enannen"
                        })}
                        name={"ANNEN_PERSON"}
                        checked={fields.hvemFra === "ANNEN_PERSON"}
                        onChange={() => setField({ hvemFra: "ANNEN_PERSON" })}
                      />
                      {hvemFra === "ANNEN_PERSON" && (
                        <ServiceKlageForAnnenPerson />
                      )}
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.hvemfra.virksomhet"
                        })}
                        name={"BEDRIFT"}
                        checked={fields.hvemFra === "BEDRIFT"}
                        onChange={() => setField({ hvemFra: "BEDRIFT" })}
                      />
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
                    <SkjemaGruppe
                      title={intl.formatMessage({
                        id: "felter.onskerkontakt"
                      })}
                      feil={sjekkForFeil(submitted, errors.onskerKontakt)}
                    >
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.onskerkontakt.ja"
                        })}
                        name={intl.formatMessage({
                          id: "felter.onskerkontakt.ja"
                        })}
                        checked={fields.onskerKontakt === "true"}
                        onChange={() => setField({ onskerKontakt: "true" })}
                      />
                      {fields.onskerKontakt === "true" && (
                        <ServiceKlageTelefon />
                      )}
                      <Radio
                        label={intl.formatMessage({
                          id: "felter.onskerkontakt.nei"
                        })}
                        name={intl.formatMessage({
                          id: "felter.onskerkontakt.nei"
                        })}
                        checked={fields.onskerKontakt === "false"}
                        onChange={() => setField({ onskerKontakt: "false" })}
                      />
                    </SkjemaGruppe>
                    {error && (
                      <AlertStripeFeil>
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
