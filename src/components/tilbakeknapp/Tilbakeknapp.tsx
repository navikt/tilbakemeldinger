import React from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@navikt/ds-react";
import { Link } from "react-router-dom";
import { useLocalePaths } from "../../Config";

export const Tilbakeknapp = () => {
  const localePaths = useLocalePaths();

  return (
    <Button
      variant={"tertiary"}
      as={Link}
      to={localePaths.tilbakemeldinger.forside}
    >
      <FormattedMessage id={"felter.tilbake"} />
    </Button>
  );
};
