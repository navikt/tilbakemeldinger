import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import { sjekkForFeil } from "../../../utils/validators";
import FeilOgManglerEpost from "./FeilOgManglerEpost";
import { Radio, RadioGroup } from "@navikt/ds-react";

const FeilgOgManglerOnskerAaKontaktes = () => {
  const intl = useIntl();

  const onskerKontaktConfig = {
    onskerKontakt: {
      isRequired: "validering.onskerkontakt.pakrevd",
    },
  };

  const initialValues = {
    onskerKontakt: false,
  };

  return (
    <Validation
      key={"onskerKontakt"}
      config={onskerKontaktConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <RadioGroup
            legend={intl.formatMessage({
              id: "felter.onskerkontakt",
            })}
            error={sjekkForFeil(submitted, errors.onskerKontakt, intl)}
            onChange={(e) => setField({ onskerKontakt: e.target.value })}
          >
            <Radio value={true}>
              {intl.formatMessage({
                id: "felter.onskerkontakt.ja",
              })}
            </Radio>
            {fields.onskerKontakt && <FeilOgManglerEpost />}
            <Radio value={false}>
              {intl.formatMessage({
                id: "felter.onskerkontakt.nei",
              })}
            </Radio>
          </RadioGroup>
        );
      }}
    </Validation>
  );
};
export default FeilgOgManglerOnskerAaKontaktes;
