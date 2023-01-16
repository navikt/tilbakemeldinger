import React from "react";
import { Validation } from "calidation";
import { useIntl } from "react-intl";
import { Radio, RadioGroup } from "@navikt/ds-react";
import { sjekkForFeil } from "../../../utils/validators";

interface Fields {
  gjelderSosialhjelp: string;
}

const ServiceKlageGjelderSosialhjelp = () => {
  const intl = useIntl();
  const ytelseTjenesteFormConfig = {
    gjelderSosialhjelp: {
      isRequired: "validering.gjeldersosialhjelp.pakrevd",
    },
  };

  const initialValues: Fields = {
    gjelderSosialhjelp: "",
  };

  return (
    <Validation
      key={"ytelse"}
      config={ytelseTjenesteFormConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <div className="serviceKlage__ekspandert">
            <RadioGroup
              legend={intl.formatMessage({
                id: "felter.gjeldersosialhjelp",
              })}
              error={sjekkForFeil(submitted, errors.gjelderSosialhjelp, intl)}
              onChange={(val) => setField({ gjelderSosialhjelp: val })}
            >
              <Radio value={"JA"}>
                {intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.ja",
                })}
              </Radio>
              <Radio value={"NEI"}>
                {intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.nei",
                })}
              </Radio>
              <Radio value={"VET_IKKE"}>
                {intl.formatMessage({
                  id: "felter.gjeldersosialhjelp.vetikke",
                })}
              </Radio>
            </RadioGroup>
          </div>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageGjelderSosialhjelp;
