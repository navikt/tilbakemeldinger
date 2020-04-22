import React from "react";
import { useIntl } from "react-intl";
import { Select } from "nav-frontend-skjema";
import { useStore } from "../../providers/Provider";
import { Locale, setNewLocale } from "../../utils/locale";
import GlobeIkon from "assets/icons/line/globe-2-line.svg";

const cssPrefix = "sprakvelger";

export const SprakVelger = () => {
  const [{ locale }, dispatch] = useStore();
  const intl = useIntl();

  return (
    <div className={cssPrefix}>
      <Select
        onChange={(e) =>
          e.target.value && setNewLocale(e.target.value as Locale, dispatch)
        }
        value={locale}
        className={`${cssPrefix}__select`}
      >
        <option value={""} disabled={true}>
          {intl.formatMessage({ id: "sprak.velg" })}
        </option>
        <option value={"nb"}>{intl.formatMessage({ id: "sprak.nb" })}</option>
        <option value={"en"}>{intl.formatMessage({ id: "sprak.en" })}</option>
      </Select>
      <div className={`${cssPrefix}__ikon-container`}>
        <img src={GlobeIkon} alt="" className={`${cssPrefix}__ikon`} />
      </div>
    </div>
  );
};
