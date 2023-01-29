import React from "react";
import { FormattedMessage } from "react-intl";
import { BodyLong, Link } from "@navikt/ds-react";
import { urls } from "Config";
import { Varsel } from "components/varsel/Varsel";

export const PersonvernInfo = () => (
  <div>
    <Varsel type={"info"}>
      <>
        <BodyLong spacing>
          <FormattedMessage
            id={"felter.melding.beskrivelse"}
            values={{
              DatatilsynetLenke: (text: string) => (
                <Link
                  className={"lenke"}
                  href={urls.tilbakemeldinger.serviceklage.datatilsynet}
                >
                  {text}
                </Link>
              ),
            }}
          />
        </BodyLong>
        <BodyLong>
          <FormattedMessage id={"felter.melding.pakrevde"} />
        </BodyLong>
      </>
    </Varsel>
  </div>
);
