import moment from "moment-timezone";
import React, { ReactNode } from "react";
import { unitOfTime } from "moment";

type Props = {
  fra: string,
  til: string,
  format?: string,
  granularity?: unitOfTime.Base,
  inclusivity?: "()" | "[)" | "(]" | "[]",
  children: ReactNode
};

const TidsbestemtVisning = ({ fra, til,
                                     format = "DD-MM-YYYY",
                                     granularity, inclusivity,
                                     children}: Props) => {
  const isInTimeRange = moment().isBetween(
    moment(fra, format),
    moment(til, format),
    granularity, inclusivity);

  return (isInTimeRange ? <>{children}</> : null);
};

export default TidsbestemtVisning;
