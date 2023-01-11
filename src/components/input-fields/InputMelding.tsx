import React, { KeyboardEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { paths, urls, vars } from "../../Config";
import { Varsel } from "../varsel/Varsel";
import { useStore } from "../../providers/Provider";
import { localePath } from "../../utils/locale";
import { Link, Textarea, TextareaProps } from "@navikt/ds-react";

interface Props extends Omit<TextareaProps, "onChange"> {
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
}

const InputMelding = (props: Props) => {
  const [blur, settBlur] = useState(false);
  const { error, label, submitted } = props;
  const [{ locale }] = useStore();
  const intl = useIntl();

  return (
    <div>
      <label className={"navds-fieldset__legend navds-label"}>{label}</label>
      <div className={"felter__melding-advarsel"}>
        <Varsel type={"warning"}>
          <FormattedMessage
            id={"felter.melding.beskrivelse"}
            values={{
              MineSakerLenke: (text: string) => (
                <Link
                  href={urls.tilbakemeldinger.serviceklage.saksoversikt[locale]}
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
                  href={urls.tilbakemeldinger.serviceklage.saksbehandlingstider}
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
        id="InputMelding-textarea"
        label={""}
        required={true}
        maxLength={vars.maksLengdeMelding}
        error={
          error && (blur || submitted)
            ? intl.formatMessage({ id: error })
            : undefined
        }
        onBlur={() => settBlur(true)}
        onKeyUp={(e: KeyboardEvent<HTMLTextAreaElement>) => {
          if (e.target instanceof HTMLTextAreaElement) {
            props.onChange(e.target.value);
          }
        }}
      />
    </div>
  );
};

export default InputMelding;
