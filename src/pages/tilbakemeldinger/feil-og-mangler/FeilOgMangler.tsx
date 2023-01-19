import React, { useState } from "react";
import VeilederIcon from "assets/icons/Veileder.svg";
import { withRouter } from "react-router-dom";
import InputMelding from "components/input-fields/InputMelding";
import { postFeilOgMangler } from "clients/apiClient";
import { HTTPError } from "types/errors";
import Header from "components/header/Header";
import { paths, vars } from "Config";
import Box from "components/box/Box";
import { FormattedMessage, useIntl } from "react-intl";
import Takk from "components/takk/Takk";
import FeilgOgManglerOnskerAaKontaktes from "./FeilOgManglerOnskerAaKontaktes";
import { triggerHotjar } from "../../../utils/hotjar";
import { MetaTags } from "../../../components/metatags/MetaTags";
import { Alert, Button, GuidePanel, Radio, RadioGroup } from "@navikt/ds-react";
import { Tilbakeknapp } from "../../../components/tilbakeknapp/Tilbakeknapp";
import {
  Controller,
  FieldValues,
  FormProvider,
  useForm,
} from "react-hook-form";

type FEILTYPE = "TEKNISK_FEIL" | "FEIL_INFO" | "UNIVERSELL_UTFORMING";

export interface FeilOgManglerFields {
  onskerKontakt: boolean;
  epost: string;
  feiltype: FEILTYPE;
  melding: string;
}

export type OutboundFeilOgMangler = {
  onskerKontakt: boolean;
  epost?: string;
  feiltype: FEILTYPE;
  melding: string;
};

const FOM = () => {
  const methods = useForm<FeilOgManglerFields>({
    reValidateMode: "onChange",
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isSubmitted },
  } = methods;

  const [loading, settLoading] = useState(false);
  const [success, settSuccess] = useState(false);
  const [error, settError] = useState<string | undefined>();
  const { formatMessage } = useIntl();

  const send = (values: FieldValues) => {
    const { onskerKontakt, feiltype, melding, epost } = values;

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
  };

  return (
    <div className="pagecontent">
      <MetaTags
        titleId={"tilbakemeldinger.feilogmangler.tittel"}
        descriptionId={"seo.feilogmangler.description"}
        path={paths.tilbakemeldinger.feilogmangler}
      />
      <Header
        title={formatMessage({
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
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(send)}>
              <div className={"skjema__content"}>
                <Controller
                  render={({ field, fieldState: { error } }) => (
                    <RadioGroup
                      {...field}
                      legend={formatMessage({
                        id: "felter.typefeil.tittel",
                      })}
                      error={error?.message}
                      value={field.value ?? null}
                    >
                      <Radio value={"TEKNISK_FEIL"}>
                        {formatMessage({ id: "felter.typefeil.tekniskfeil" })}
                      </Radio>
                      <Radio value={"FEIL_INFO"}>
                        {formatMessage({
                          id: "felter.typefeil.feilinformasjon",
                        })}
                      </Radio>
                      <Radio value={"UNIVERSELL_UTFORMING"}>
                        {formatMessage({ id: "felter.typefeil.uu" })}
                      </Radio>
                    </RadioGroup>
                  )}
                  control={control}
                  name={"feiltype"}
                  rules={{
                    required: formatMessage({
                      id: "validering.feiltype.pakrevd",
                    }),
                  }}
                />

                <InputMelding
                  {...register("melding", {
                    required: formatMessage({
                      id: "validering.melding.pakrevd",
                    }),
                    maxLength: {
                      value: vars.maksLengdeMelding,
                      message: formatMessage({ id: "validering.melding.tegn" }),
                    },
                  })}
                  label={formatMessage({ id: "felter.melding.tittel" })}
                  value={watch().melding}
                  error={errors?.melding?.message}
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
                      disabled={loading || (isSubmitted && !isValid)}
                      loading={loading}
                    >
                      <FormattedMessage id={"felter.send"} />
                    </Button>
                  </div>
                  <div className="tb__knapp">
                    <Tilbakeknapp />
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        )}
      </Box>
    </div>
  );
};
export default withRouter(FOM);
