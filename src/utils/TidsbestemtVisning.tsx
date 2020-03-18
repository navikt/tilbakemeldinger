import moment from "moment-timezone";
import React, { ReactNode } from "react";
import { unitOfTime } from "moment";
import { vars } from "../Config";

type InclusivityType = "()" | "[)" | "(]" | "[]";

type Props = {
  fra?: string,
  til?: string,
  format?: string,
  granularity?: unitOfTime.Base,
  inclusivity?: InclusivityType,
  children: ReactNode
};

const TidsbestemtVisning = ({
                              fra, til,
                              format = vars.defaultDatoTidFormat,
                              granularity, inclusivity,
                              children
                            }: Props) => {
  if (fra && til) {
    return (moment().isBetween(
      moment(fra, format),
      moment(til, format),
      granularity, inclusivity) ? <>{children}</> : null);
  }
  if (!fra && til) {
    return moment().isBefore(
      moment(til, format), granularity) ? <>{children}</> : null;
  }
  if (fra && !til) {
    return moment().isAfter(
      moment(fra, format), granularity) ? <>{children}</> : null;
  }

  return null;
};

export default TidsbestemtVisning;
