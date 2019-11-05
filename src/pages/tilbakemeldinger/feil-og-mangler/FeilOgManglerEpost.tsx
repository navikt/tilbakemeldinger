import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import InputEpost from "components/input-fields/InputEpost";

const FeilOgManglerEpost = () => {
  const intl = useIntl();
  const epostConfig = {
    epost: {
      isRequired: intl.formatMessage({
        id: "validering.epost.pakrevd"
      }),
      isEmail: intl.formatMessage({
        id: "validering.epost.gyldig"
      })
    }
  };

  return (
    <Validation key={"epost"} config={epostConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <InputEpost
              bredde={"L"}
              label={intl.formatMessage({ id: "felter.epost.tittel" })}
              value={fields.epost}
              error={errors.epost}
              onChange={v => setField({ epost: v })}
              submitted={submitted}
            />
          </div>
        );
      }}
    </Validation>
  );
};
export default FeilOgManglerEpost;
