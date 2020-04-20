import React from "react";
import { useIntl } from "react-intl";
import { Select } from "nav-frontend-skjema";
import { useStore } from "../../providers/Provider";
import { Locale, setNewLocale } from "../../utils/locale";
import GlobeIkon from "assets/icons/line/globe-2-line.svg";

export const SprakVelger = () => {
  const [{ locale }, dispatch] = useStore();
  const intl = useIntl();

  return (
    <div className={"sprakvelger"}>
      <Select
        onChange={(e) => e.target.value && setNewLocale(e.target.value as Locale, dispatch)}
        value={locale}
      >
        <option value={""} disabled={true}>{intl.formatMessage({ id: "sprak.velg" })}</option>
        <option value={"nb"}>{intl.formatMessage({ id: "sprak.nb" })}</option>
        <option value={"en"}>{intl.formatMessage({ id: "sprak.en" })}</option>
      </Select>
      <div className={"sprakvelger__ikon-container"}>
        <img src={GlobeIkon} alt="" className={"sprakvelger__ikon"} />
      </div>
    </div>
  );
};
