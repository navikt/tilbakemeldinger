import React, { useState } from "react";
import VeilederIcon from "assets/icons/Veileder.svg";
import { Link } from "react-router-dom";
import InputMelding from "components/input-fields/InputMelding";
import { postRosTilNav } from "clients/apiClient";
import { HTTPError } from "types/errors";
import { FormContext, FormValidation, Validation } from "calidation";
import Header from "components/header/Header";
import { paths, useLocalePaths } from "Config";
import Box from "components/box/Box";
import { FormattedMessage, useIntl } from "react-intl";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import { triggerHotjar } from "utils/hotjar";
import SelectEnhet from "components/input-fields/SelectEnhet";
import { MetaTags } from "../../../components/metatags/MetaTags";
import {
  Alert,
  Button,
  GuidePanel,
  Loader,
  Radio,
  RadioGroup,
} from "@navikt/ds-react";

type HVEM_ROSES = "NAV_KONTAKTSENTER" | "NAV_DIGITALE_TJENESTER" | "NAV_KONTOR";

interface Fields {
  navn?: string; // todo: brukes dette feltet?
  melding: string;
  hvemRoses: HVEM_ROSES;
  navKontor: {
    label: string;
    value: string;
  };
}

export type OutboundRosTilNav = {
  navn?: string;
  melding: string;
} & (
  | { hvemRoses: "NAV_KONTAKTSENTER" }
  | { hvemRoses: "NAV_DIGITALE_TJENESTER" }
  | { hvemRoses: "NAV_KONTOR"; navKontor: string }
);

const Ros = () => {
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState<string | undefined>();
  const intl = useIntl();
  const localePaths = useLocalePaths();

  const formConfig = {
    navn: {},
    hvemRoses: {
      isRequired: "validering.hvemroses.pakrevd",
    },
    melding: {
      isRequired: "validering.melding.pakrevd",
      isValidMelding: "validering.melding.tegn",
    },
  };

  const initialValues = {} as any;

  const navKontorConfig = {
    navKontor: {
      isRequired: intl.formatMessage({
        id: "validering.navkontor.pakrevd",
      }),
    },
  };

  const send = (e: FormContext<Fields>) => {
    const { isValid, fields } = e;
    const { navn, melding } = fields;
    const hvemRoses: HVEM_ROSES = fields.hvemRoses;

    if (isValid) {
      const outbound = {
        ...(navn && {
          navn,
        }),
        melding,
        hvemRoses,
        ...(fields.hvemRoses === "NAV_KONTOR" && {
          navKontor: fields.navKontor ? fields.navKontor.label : undefined,
        }),
      } as OutboundRosTilNav;

      settLoading(true);
      postRosTilNav(outbound)
        .then(() => {
          settSuccess(true);
          triggerHotjar("rosnav");
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
        titleId={"tilbakemeldinger.ros.tittel"}
        descriptionId={"seo.rostilnav.description"}
        path={paths.tilbakemeldinger.rostilnav}
      />
      <Header
        title={intl.formatMessage({ id: "tilbakemeldinger.ros.form.tittel" })}
      />
      <div className={"tb__veileder"}>
        <GuidePanel
          illustration={<img src={VeilederIcon} alt="" />}
          poster={true}
        >
          <div className={"tb__veileder-container"}>
            <FormattedMessage id={"tilbakemeldinger.ros.form.veileder"} />
          </div>
        </GuidePanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <FormValidation
            onSubmit={send}
            config={formConfig}
            initialValues={initialValues}
          >
            {({ errors, fields, submitted, setField, isValid }) => {
              return (
                <div className={"skjema__content"}>
                  <RadioGroup
                    legend={intl.formatMessage({
                      id: "felter.hvemroses.tittel",
                    })}
                    error={sjekkForFeil(submitted, errors.hvemRoses, intl)}
                    onChange={(val) => setField({ hvemRoses: val })}
                  >
                    <Radio value={"NAV_KONTAKTSENTER"}>
                      {intl.formatMessage({
                        id: "felter.hvemroses.navkontaktsenter",
                      })}
                    </Radio>
                    <Radio value={"NAV_KONTOR"}>
                      {intl.formatMessage({
                        id: "felter.hvemroses.navkontor",
                      })}
                    </Radio>
                  </RadioGroup>

                  {fields.hvemRoses === "NAV_KONTOR" && (
                    <Validation config={navKontorConfig}>
                      {() => (
                        <SelectEnhet
                          label={"felter.hvemroses.navkontor.velg"}
                          error={errors.navKontor}
                          submitted={submitted}
                          value={fields.navKontor}
                          onChange={(v?: { value: string; label: string }) =>
                            setField({ navKontor: v })
                          }
                        />
                      )}
                    </Validation>
                  )}
                  <InputMelding
                    label={intl.formatMessage({
                      id: "felter.melding.tittel",
                    })}
                    submitted={submitted}
                    error={errors.melding}
                    onChange={(v) => setField({ melding: v })}
                  />
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
export default Ros;
