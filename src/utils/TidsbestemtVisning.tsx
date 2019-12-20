import moment from "moment-timezone";
import React, { ReactNode } from "react";
import { unitOfTime } from "moment";
import { vars } from "../Config";

type Props = {
  fra: string,
  til: string,
  format?: string,
  granularity?: unitOfTime.Base,
  inclusivity?: "()" | "[)" | "(]" | "[]",
  children: ReactNode
};

const TidsbestemtVisning = ({ fra, til,
                                     format = vars.defaultDatoTidFormat,
                                     granularity, inclusivity,
                                     children}: Props) => {
  const isInTimeRange = moment().isBetween(
    moment(fra, format),
    moment(til, format),
    granularity, inclusivity);

  return (isInTimeRange ? <>{children}</> : null);
};

export default TidsbestemtVisning;
