import React from "react";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";

interface Fields {
  klagetypeUtdypning: string;
}

const ServiceKlageTypeUtdypning = () => {
  const klagetypeUtdypningFormConfig = {
    klagetypeUtdypning: {
      isRequired: "validering.klagetype.utdypning.pakrevd",
    },
  };

  const initialValues: Fields = {
    klagetypeUtdypning: "",
  };

  return (
    <Validation
      key={"klagetype-utdypning"}
      config={klagetypeUtdypningFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputField
              label={""}
              error={errors.klagetypeUtdypning}
              onChange={(v) => setField({ klagetypeUtdypning: v })}
              submitted={submitted}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageTypeUtdypning;
