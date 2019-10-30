import React from "react";
import { Validation } from "calidation";
import InputField from "components/input-fields/InputField";

const ServiceKlageYtelse = () => {
  const ytelseTjenesteFormConfig = {
    ytelseTjeneste: {}
  };

  return (
    <Validation key={"ytelse"} config={ytelseTjenesteFormConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
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
        );
      }}
    </Validation>
  );
};
export default ServiceKlageYtelse;
