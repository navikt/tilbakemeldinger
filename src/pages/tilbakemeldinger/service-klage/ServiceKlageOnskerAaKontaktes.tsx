import React from "react";
import { useIntl } from "react-intl";
import { Validation } from "calidation";
import { Radio, SkjemaGruppe } from "nav-frontend-skjema";
import { sjekkForFeil } from "../../../utils/validators";
import ServiceKlageTelefon from "./ServiceKlageTelefon";

const ServiceKlageOnskerAaKontaktes = () => {
  const intl = useIntl();
  const onskerKontaktConfig = {
    onskerKontakt: {
      isRequired: intl.formatMessage({ id: "validering.onskerkontakt.pakrevd" })
    }
  };

  return (
    <Validation key={"onskerKontakt"} config={onskerKontaktConfig}>
      {({ errors, fields, submitted, setField }) => {
        return (
          <SkjemaGruppe
            title={intl.formatMessage({
              id: "felter.onskerkontakt"
            })}
            feil={sjekkForFeil(submitted, errors.onskerKontakt)}
          >
            <Radio
              label={intl.formatMessage({
                id: "felter.onskerkontakt.ja"
              })}
              name={intl.formatMessage({
                id: "felter.onskerkontakt.ja"
              })}
              checked={fields.onskerKontakt === "true"}
              onChange={() => setField({ onskerKontakt: "true" })}
            />
            {fields.onskerKontakt === "true" && <ServiceKlageTelefon />}
            <Radio
              label={intl.formatMessage({
                id: "felter.onskerkontakt.nei"
              })}
              name={intl.formatMessage({
                id: "felter.onskerkontakt.nei"
              })}
              checked={fields.onskerKontakt === "false"}
              onChange={() => setField({ onskerKontakt: "false" })}
            />
          </SkjemaGruppe>
        );
      }}
    </Validation>
  );
};
export default ServiceKlageOnskerAaKontaktes;
