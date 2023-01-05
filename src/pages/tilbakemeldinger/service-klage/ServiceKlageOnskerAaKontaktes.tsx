import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import { sjekkForFeil } from "../../../utils/validators";
import ServiceKlageTelefon from "./ServiceKlageTelefon";
import ServiceKlageKontaktBedrift from "./ServiceKlageKontaktBedrift";
import { Radio, RadioGroup } from "@navikt/ds-react";

const ServiceKlageOnskerAaKontaktes = () => {
  const intl = useIntl();
  const initialValues = {} as any;
  const onskerKontaktConfig = {
    onskerKontakt: {
      isRequired: "validering.onskerkontakt.pakrevd",
    },
  };

  return (
    <Validation
      key={"onskerKontakt"}
      config={onskerKontaktConfig}
      initialValues={initialValues}
    >
      {({ errors, fields, submitted, setField }) => {
        return (
          <>
            <RadioGroup
              legend={intl.formatMessage({
                id: "tilbakemeldinger.serviceklage.form.onskersvar",
              })}
              error={sjekkForFeil(submitted, errors.onskerKontakt, intl)}
              onChange={(e) => setField({ onskerKontakt: e.target.value })}
            >
              <Radio value={true}>
                {intl.formatMessage({
                  id: "tilbakemeldinger.serviceklage.form.onskersvar.ja",
                })}
              </Radio>
              <Radio value={false}>
                {intl.formatMessage({
                  id: "tilbakemeldinger.serviceklage.form.onskersvar.nei",
                })}
              </Radio>
            </RadioGroup>

            {fields.onskerKontakt && (
              <>
                {fields.hvemFra === "BEDRIFT" && <ServiceKlageKontaktBedrift />}
                <ServiceKlageTelefon />
              </>
            )}
          </>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageOnskerAaKontaktes;
