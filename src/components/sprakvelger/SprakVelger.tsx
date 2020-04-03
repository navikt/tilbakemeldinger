import React from "react";
import { Select } from "nav-frontend-skjema";
import { useStore } from "../../providers/Provider";
import { Lang } from "../../types/sprak";

export const SprakVelger = () => {
  const [, dispatch] = useStore();

  return (
    <Select
      onChange={(e) => e.target.value && dispatch({
        type: "SETT_LOCALE",
        payload: e.target.value as Lang
      })}
    >
      <option value={""}>Velg språk</option>
      <option value={"nb"}>Norsk</option>
      <option value={"en"}>Engelsk</option>
    </Select>
  );
};
