import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";
import { useStore } from "providers/Provider";

const ServiceKlageTelefon = () => {
  const intl = useIntl();
  const [{ kontaktInfo }] = useStore();

  const initialValues = {
    innmelderTlfnr: kontaktInfo.mobiltelefonnummer || "",
  };

  const tlfFormConfig = {
    innmelderTlfnr: {
      isRequired: "validering.tlf.pakrevd",
    },
  };

  return (
    <Validation
      key={"tlf"}
      config={tlfFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              htmlSize={20}
              label={intl.formatMessage({ id: "felter.tlf.tittel" })}
              error={errors.innmelderTlfnr}
              onChange={(v) => setField({ innmelderTlfnr: v })}
              submitted={submitted}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageTelefon;
