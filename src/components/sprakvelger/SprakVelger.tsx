import React from "react";
import { useIntl } from "react-intl";
import { Select } from "nav-frontend-skjema";
import { useStore } from "../../providers/Provider";
import { Locale, setNewLocaleUrl } from "../../utils/locale";

export const SprakVelger = () => {
  const [{ locale }, dispatch] = useStore();
  const intl = useIntl();

  return (
    <Select
      onChange={(e) => e.target.value && setNewLocaleUrl(e.target.value as Locale, dispatch)}
      value={locale}
    >
      <option value={""} disabled={true}>{intl.formatMessage({ id: "sprak.velg" })}</option>
      <option value={"nb"}>{intl.formatMessage({ id: "sprak.nb" })}</option>
      <option value={"en"}>{intl.formatMessage({ id: "sprak.en" })}</option>
    </Select>
  );
};
