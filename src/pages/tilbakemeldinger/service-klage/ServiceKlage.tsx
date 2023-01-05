import React, { useState } from "react";
import VeilederIcon from "assets/icons/Veileder.svg";
import { useStore } from "providers/Provider";
import { Link } from "react-router-dom";
import { postServiceKlage } from "clients/apiClient";
import { HTTPError } from "types/errors";
import { FormContext, FormValidation } from "calidation";
import InputMelding from "components/input-fields/InputMelding";
import {
  ON_BEHALF_OF,
  OutboundServiceKlageBase,
  OutboundServiceKlageExtend,
} from "types/serviceklage";
import Header from "components/header/Header";
import { paths, useLocalePaths } from "Config";
import Box from "components/box/Box";
import { FormattedMessage, useIntl } from "react-intl";
import ServiceKlagePrivatperson from "./ServiceKlagePrivatperson";
import ServiceKlageForAnnenPerson from "./ServiceKlageAnnenPerson";
import ServiceKlageForBedrift from "./ServiceKlageBedrift";
import ServiceKlageGjelderSosialhjelp from "./ServiceKlageGjelderSosialhjelp";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import { triggerHotjar } from "utils/hotjar";
import ServiceKlageOnskerAaKontaktes from "./ServiceKlageOnskerAaKontaktes";
import ServiceKlageTypeUtdypning from "./ServiceKlageTypeUtdypning";
import { MetaTags } from "../../../components/metatags/MetaTags";
import LoginModal from "./login-modal/LoginModal";
import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  GuidePanel,
  Loader,
  Modal,
  Radio,
  RadioGroup,
} from "@navikt/ds-react";

export type OutboundServiceKlage = OutboundServiceKlageBase &
  OutboundServiceKlageExtend;

const ServiceKlage = () => {
  const [{ auth }] = useStore();
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState<string | undefined>();
  const [loginClosed, setLoginClosed] = useState(false);

  const intl = useIntl();
  const localePaths = useLocalePaths();

  const closeModal = () => setLoginClosed(true);

  const baseFormConfig = {
    klagetyper: {
      isRequired: "validering.klagetyper.pakrevd",
      isValidFeiltyper: "validering.klagetyper.velg",
    },
    hvemFra: {
      isRequired: "validering.hvemfra.pakrevd",
    },
    melding: {
      isRequired: "validering.melding.pakrevd",
      isValidMelding: "validering.melding.tegn",
    },
  };

  const initialValues = {
    klagetyper: [],
  } as any;

  const send = (e: FormContext<any>) => {
    const { isValid, fields } = e;
    const hvemFra: ON_BEHALF_OF = fields.hvemFra;

    if (isValid) {
      const outboundBase: OutboundServiceKlageBase = {
        klagetekst: fields.melding,
        klagetyper: fields.klagetyper,
        klagetypeUtdypning: fields.klagetypeUtdypning,
        oenskerAaKontaktes: fields.onskerKontakt,
        ...(fields.klagetyper.includes("LOKALT_NAV_KONTOR") && {
          gjelderSosialhjelp: fields.gjelderSosialhjelp,
        }),
      };

      const outboundExtend: {
        [key in ON_BEHALF_OF]: OutboundServiceKlageExtend;
      } = {
        PRIVATPERSON: {
          paaVegneAv: "PRIVATPERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            ...(fields.innmelderTlfnr && {
              telefonnummer: fields.innmelderTlfnr,
            }),
            personnummer: fields.innmelderFnr,
          },
        },
        ANNEN_PERSON: {
          paaVegneAv: "ANNEN_PERSON",
          innmelder: {
            navn: fields.innmelderNavn,
            ...(fields.innmelderTlfnr && {
              telefonnummer: fields.innmelderTlfnr,
            }),
            harFullmakt: fields.innmelderHarFullmakt,
            rolle: fields.innmelderRolle,
          },
          paaVegneAvPerson: {
            navn: fields.paaVegneAvNavn,
            personnummer: fields.paaVegneAvFodselsnr,
          },
        },
        BEDRIFT: {
          paaVegneAv: "BEDRIFT",
          ...(fields.enhetsnummerPaaklaget && {
            enhetsnummerPaaklaget: fields.enhetsnummerPaaklaget.value,
          }),
          innmelder: {
            ...(fields.onskerKontakt && {
              navn: fields.innmelderNavn,
              telefonnummer: fields.innmelderTlfnr,
            }),
            ...(fields.innmelderRolle && {
              rolle: fields.innmelderRolle,
            }),
          },
          paaVegneAvBedrift: {
            navn: fields.orgNavn,
            organisasjonsnummer: fields.orgNummer,
          },
        },
      };

      const outbound = {
        ...outboundBase,
        ...outboundExtend[hvemFra],
      };

      settLoading(true);
      postServiceKlage(outbound)
        .then(() => {
          settSuccess(true);
          triggerHotjar("serviceklage");
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
      <MetaTags
        titleId={"tilbakemeldinger.serviceklage.form.tittel"}
        descriptionId={"seo.klagepaservice.description"}
        path={paths.tilbakemeldinger.serviceklage.form}
      />
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.serviceklage.form.tittel",
        })}
      />
      <Modal
        open={auth.loaded && !auth.authenticated && !loginClosed}
        onClose={closeModal}
      >
        <Modal.Content>
          <LoginModal closeFunc={closeModal} />
        </Modal.Content>
      </Modal>
      <div className={"tb__veileder"}>
        <GuidePanel
          illustration={<img src={VeilederIcon} alt="" />}
          poster={true}
        >
          <div className={"tb__veileder-container"}>
            <FormattedMessage id="tilbakemeldinger.serviceklage.form.veileder" />
          </div>
        </GuidePanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <FormValidation
            onSubmit={send}
            config={baseFormConfig}
            initialValues={initialValues}
          >
            {({ errors, fields, submitted, setField, isValid }) => {
              const hvemFra: ON_BEHALF_OF = fields.hvemFra;
              const { innmelderHarFullmakt } = fields;
              const kanOnskeAaKontaktes =
                hvemFra !== "ANNEN_PERSON" || innmelderHarFullmakt !== false;

              return (
                <div className="skjema__content">
                  <CheckboxGroup
                    legend={intl.formatMessage({ id: "felter.klagetyper" })}
                    error={sjekkForFeil(submitted, errors.klagetyper, intl)}
                    onChange={(values: string[]) =>
                      setField({ klagetyper: values })
                    }
                  >
                    <div className={"felter__melding-advarsel"}>
                      <Alert variant={"info"}>
                        <FormattedMessage id={"felter.klagetyper.info"} />
                      </Alert>
                    </div>
                    <Checkbox value={"TELEFON"}>
                      {intl.formatMessage({
                        id: "felter.klagetyper.telefon",
                      })}
                    </Checkbox>
                    <Checkbox value={"LOKALT_NAV_KONTOR"}>
                      {intl.formatMessage({
                        id: "felter.klagetyper.navkontor",
                      })}
                    </Checkbox>
                    <Checkbox value={"NAV_DIGITALE_TJENESTER"}>
                      {intl.formatMessage({
                        id: "felter.klagetyper.digitaletjenester",
                      })}
                    </Checkbox>
                    <Checkbox value={"BREV"}>
                      {intl.formatMessage({
                        id: "felter.klagetyper.brev",
                      })}
                    </Checkbox>
                    <Checkbox value={"ANNET"}>
                      {intl.formatMessage({
                        id: "felter.klagetyper.annet",
                      })}
                    </Checkbox>
                    {fields.klagetyper.includes("ANNET") && (
                      <ServiceKlageTypeUtdypning />
                    )}
                  </CheckboxGroup>
                  {fields.klagetyper.includes("LOKALT_NAV_KONTOR") && (
                    <ServiceKlageGjelderSosialhjelp />
                  )}
                  <RadioGroup
                    legend={intl.formatMessage({ id: "felter.hvemfra" })}
                    error={sjekkForFeil(submitted, errors.hvemFra, intl)}
                    onChange={(e) => setField({ hvemFra: e.target.value })}
                  >
                    <Radio value={"PRIVATPERSON"}>
                      {intl.formatMessage({
                        id: "felter.hvemfra.megselv",
                      })}
                    </Radio>
                    <Radio value={"ANNEN_PERSON"}>
                      {intl.formatMessage({
                        id: "felter.hvemfra.enannen",
                      })}
                    </Radio>
                    <Radio value={"BEDRIFT"}>
                      {intl.formatMessage({
                        id: "felter.hvemfra.virksomhet",
                      })}
                    </Radio>
                  </RadioGroup>

                  {hvemFra === "PRIVATPERSON" && <ServiceKlagePrivatperson />}
                  {hvemFra === "ANNEN_PERSON" && <ServiceKlageForAnnenPerson />}
                  {hvemFra === "BEDRIFT" && <ServiceKlageForBedrift />}

                  <div className="serviceKlage__melding">
                    <InputMelding
                      label={intl.formatMessage({
                        id: "felter.melding.tittel",
                      })}
                      submitted={submitted}
                      error={errors.melding}
                      onChange={(v) => setField({ melding: v })}
                    />
                  </div>
                  {kanOnskeAaKontaktes && <ServiceKlageOnskerAaKontaktes />}
                  {error && (
                    <Alert
                      variant={"error"}
                      className={"felter__melding-advarsel"}
                    >
                      <FormattedMessage id={"felter.noegikkgalt"} />
                    </Alert>
                  )}
                  <div className="tb__knapper">
                    <div className="tb__knapp">
                      <Button
                        type={"submit"}
                        variant={"secondary"}
                        disabled={loading || (submitted && !isValid)}
                      >
                        {loading ? (
                          <Loader size={"small"} />
                        ) : (
                          <FormattedMessage id={"felter.send"} />
                        )}
                      </Button>
                    </div>
                    <div className="tb__knapp">
                      <Link
                        className="lenkeknapp knapp knapp--flat"
                        to={localePaths.tilbakemeldinger.forside}
                      >
                        <FormattedMessage id={"felter.tilbake"} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }}
          </FormValidation>
        )}
      </Box>
    </div>
  );
};

export default ServiceKlage;
