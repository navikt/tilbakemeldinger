import React, { ForwardedRef } from "react";
import { FormattedMessage } from "react-intl";
import { paths, urls, vars } from "../../Config";
import { Varsel } from "../varsel/Varsel";
import { useStore } from "../../providers/Provider";
import { localePath } from "../../utils/locale";
import { Link, Textarea, TextareaProps } from "@navikt/ds-react";

const InputMelding = React.forwardRef(
  (props: TextareaProps, ref: ForwardedRef<any>) => {
    const [{ locale }] = useStore();

    return (
      <div>
        <div
          className={"felter__melding-advarsel"}
          id={"InputMelding-advarsel"}
        >
          <Varsel type={"warning"}>
            <FormattedMessage
              id={"felter.melding.beskrivelse"}
              values={{
                MineSakerLenke: (text: string) => (
                  <Link
                    href={
                      urls.tilbakemeldinger.serviceklage.saksoversikt[locale]
                    }
                  >
                    {text}
                  </Link>
                ),
                DittNavLenke: (text: string) => (
                  <Link href={urls.tilbakemeldinger.serviceklage.dittNav}>
                    {text}
                  </Link>
                ),
                SaksbehandlingstiderLenke: (text: string) => (
                  <Link
                    href={
                      urls.tilbakemeldinger.serviceklage.saksbehandlingstider
                    }
                  >
                    {text}
                  </Link>
                ),
                SkrivTilOssLenke: (text: string) => (
                  <Link
                    className={"lenke"}
                    href={localePath(
                      paths.skrivTilOss.forside,
                      locale === "nn" ? "nb" : locale
                    )}
                  >
                    {text}
                  </Link>
                ),
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
          </Varsel>
        </div>
        <Textarea
          aria-describedby={"InputMelding-advarsel"}
          id="InputMelding-textarea"
          maxLength={vars.maksLengdeMelding}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default InputMelding;
