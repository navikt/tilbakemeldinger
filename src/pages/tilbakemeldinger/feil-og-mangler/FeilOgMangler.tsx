import React, { useState } from "react";
import VeilederIcon from "assets/icons/Veileder.svg";
import { Link, withRouter } from "react-router-dom";
import InputMelding from "components/input-fields/InputMelding";
import { postFeilOgMangler } from "clients/apiClient";
import { HTTPError } from "types/errors";
import { FormContext, FormValidation } from "calidation";
import Header from "components/header/Header";
import { paths, useLocalePaths } from "Config";
import Box from "components/box/Box";
import { FormattedMessage, useIntl } from "react-intl";
import Takk from "components/takk/Takk";
import { sjekkForFeil } from "utils/validators";
import FeilgOgManglerOnskerAaKontaktes from "./FeilOgManglerOnskerAaKontaktes";
import { triggerHotjar } from "../../../utils/hotjar";
import { MetaTags } from "../../../components/metatags/MetaTags";
import {
  Alert,
  Button,
  GuidePanel,
  Loader,
  Radio,
  RadioGroup,
} from "@navikt/ds-react";

export type OutboundFeilOgMangler = {
  onskerKontakt: boolean;
  epost?: string;
  feiltype: "TEKNISK_FEIL" | "FEIL_INFO" | "UNIVERSELL_UTFORMING";
  melding: string;
};

const FOM = () => {
  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState<string | undefined>();
  const intl = useIntl();
  const localePaths = useLocalePaths();

  const formConfig = {
    feiltype: {
      isRequired: "validering.feiltype.pakrevd",
    },
    melding: {
      isRequired: "validering.melding.pakrevd",
      isValidMelding: "validering.melding.tegn",
    },
  };

  const send = (e: FormContext<OutboundFeilOgMangler>) => {
    const { isValid, fields } = e;
    const { onskerKontakt, feiltype, melding } = fields;
    const { epost } = fields;

    if (isValid) {
      const outbound = {
        feiltype,
        onskerKontakt,
        ...(onskerKontakt && {
          epost,
        }),
        melding,
      };

      settLoading(true);
      postFeilOgMangler(outbound)
        .then(() => {
          settSuccess(true);
          triggerHotjar("feilogmangler");
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
        titleId={"tilbakemeldinger.feilogmangler.tittel"}
        descriptionId={"seo.feilogmangler.description"}
        path={paths.tilbakemeldinger.feilogmangler}
      />
      <Header
        title={intl.formatMessage({
          id: "tilbakemeldinger.feilogmangler.form.tittel",
        })}
      />
      <div className={"tb__veileder"}>
        <GuidePanel
          illustration={<img src={VeilederIcon} alt="" />}
          poster={true}
        >
          <div className={"tb__veileder-container"}>
            <FormattedMessage
              id={"tilbakemeldinger.feilogmangler.form.veileder"}
            />
          </div>
        </GuidePanel>
      </div>
      <Box>
        {success ? (
          <Takk />
        ) : (
          <FormValidation onSubmit={send} config={formConfig}>
            {({ errors, fields, submitted, setField, isValid }) => (
              <div className={"skjema__content"}>
                <RadioGroup
                  legend={intl.formatMessage({
                    id: "felter.typefeil.tittel",
                  })}
                  error={sjekkForFeil(submitted, errors.feiltype, intl)}
                  onChange={(e) => setField({ feiltype: e.target.value })}
                >
                  <Radio value={"TEKNISK_FEIL"}>
                    {intl.formatMessage({
                      id: "felter.typefeil.tekniskfeil",
                    })}
                  </Radio>
                  <Radio value={"FEIL_INFO"}>
                    {intl.formatMessage({
                      id: "felter.typefeil.feilinformasjon",
                    })}
                  </Radio>
                  <Radio value={"UNIVERSELL_UTFORMING"}>
                    {intl.formatMessage({
                      id: "felter.typefeil.uu",
                    })}
                  </Radio>
                </RadioGroup>

                <InputMelding
                  label={intl.formatMessage({
                    id: "felter.melding.tittel",
                  })}
                  submitted={submitted}
                  error={errors.melding}
                  onChange={(v) => setField({ melding: v })}
                />
                <FeilgOgManglerOnskerAaKontaktes />
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
            )}
          </FormValidation>
        )}
      </Box>
    </div>
  );
};
export default withRouter(FOM);
