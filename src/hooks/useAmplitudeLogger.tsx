import { useEffect } from "react";
import { logPageview } from "../utils/amplitude";
import { useIntl } from "react-intl";

export const useAmplitudeLogger = (title: string) => {
  const { formatMessage } = useIntl();

  useEffect(() => {
    logPageview(formatMessage({ id: title }));
  }, []);
};
