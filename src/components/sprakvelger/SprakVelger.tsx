import React from "react";
import { useIntl } from "react-intl";
import { Select } from "nav-frontend-skjema";
import { useStore } from "../../providers/Provider";
import { Locale } from "../../types/sprak";

export const SprakVelger = () => {
  const [, dispatch] = useStore();
  const intl = useIntl();

  return (
    <Select
      onChange={(e) => e.target.value && dispatch({
        type: "SETT_LOCALE",
        payload: e.target.value as Locale
      })}
    >
      <option value={""}>{intl.formatMessage({id: "sprak.velg"})}</option>
      <option value={"nb"}>{intl.formatMessage({id: "sprak.nb"})}</option>
      <option value={"en"}>{intl.formatMessage({id: "sprak.en"})}</option>
    </Select>
  );
};
