import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Validation } from "calidation";
import { useStore } from "providers/Provider";
import InputField from "components/input-fields/InputField";
import { Alert } from "@navikt/ds-react";

const FeilOgManglerEpost = () => {
  const intl = useIntl();
  const [{ kontaktInfo }] = useStore();

  const initialValues = {
    epost: kontaktInfo.epostadresse || "",
  };

  const epostConfig = {
    epost: {
      isRequired: "validering.epost.pakrevd",
      isEmail: "validering.epost.gyldig",
    },
  };

  return (
    <Validation
      key={"epost"}
      config={epostConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              label={intl.formatMessage({ id: "felter.epost.tittel" })}
              error={errors.epost}
              onChange={(v) => setField({ epost: v })}
              submitted={submitted}
            />
            <div className="tilbakemeldinger__svartid">
              <Alert variant={"info"}>
                <FormattedMessage
                  id={"tilbakemeldinger.feilogmangler.svartid"}
                />
              </Alert>
            </div>
          </div>
        );
      }}
    </Validation>
  );
};
export default FeilOgManglerEpost;
