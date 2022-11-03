import { TextareaControlled, TextareaProps } from "nav-frontend-skjema";
import React, { KeyboardEvent, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { paths, urls, vars } from "../../Config";
import { Varsel } from "../varsel/Varsel";
import { useStore } from "../../providers/Provider";
import { localePath } from "../../utils/locale";
import Lenke from "nav-frontend-lenker";

interface Props extends Omit<TextareaProps, "onChange"> {
  onChange: (value: string) => void;
  error: string | null;
  submitted: boolean;
  value: string;
}

const InputMelding = (props: Props) => {
  const [blur, settBlur] = useState(false);
  const { error, value, label, submitted } = props;
  const [{ locale }] = useStore();
  const intl = useIntl();

  return (
    <div>
      <label className={"skjemagruppe__legend"} htmlFor="InputMelding-textarea">
        {label}
      </label>
      <div className={"felter__melding-advarsel"}>
        <Varsel type={"advarsel"}>
          <FormattedMessage
            id={"felter.melding.beskrivelse"}
            values={{
              MineSakerLenke: (text: string) => (
                <Lenke
                  href={urls.tilbakemeldinger.serviceklage.saksoversikt[locale]}
                >
                  {text}
                </Lenke>
              ),
              DittNavLenke: (text: string) => (
                <Lenke href={urls.tilbakemeldinger.serviceklage.dittNav}>
                  {text}
                </Lenke>
              ),
              SaksbehandlingstiderLenke: (text: string) => (
                <Lenke
                  href={urls.tilbakemeldinger.serviceklage.saksbehandlingstider}
                >
                  {text}
                </Lenke>
              ),
              SkrivTilOssLenke: (text: string) => (
                <Lenke
                  className={"lenke"}
                  href={localePath(
                    paths.skrivTilOss.forside,
                    locale === "nn" ? "nb" : locale
                  )}
                >
                  {text}
                </Lenke>
              ),
              DatatilsynetLenke: (text: string) => (
                <Lenke
                  className={"lenke"}
                  href={urls.tilbakemeldinger.serviceklage.datatilsynet}
                >
                  {text}
                </Lenke>
              ),
            }}
          />
        </Varsel>
      </div>
      <TextareaControlled
        id="InputMelding-textarea"
        label={""}
        required={true}
        value={value}
        defaultValue={""}
        maxLength={vars.maksLengdeMelding}
        feil={
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
