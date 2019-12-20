import moment from "moment-timezone";
import FormattedMsgMedParagrafer from "../intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import React from "react";
import Apningstider from "../../utils/apningstider";

type Props = {
  apningstider: Apningstider,
  harChatbot?: boolean
};

const ApningstiderAvvik = ({apningstider, harChatbot = false}: Props) => {
  const apningstiderAvvik = apningstider.getAktuelleAvvikstider();
  const datoFormat = (dato: string) => moment(dato, "DD-MM-YYYY").format("DD.MM.");

  return apningstiderAvvik.length > 0 ? (
    <div className={`apningstider-avvik`}>
      <span className={`apningstider-avvik-header`}>
        <FormattedMsgMedParagrafer id={harChatbot ? "apningstid.avvik.chatbot" : "apningstid.avvik"} />
      </span>
      {apningstiderAvvik.map((datoTidsrom, index) => (
        datoTidsrom.tidsrom ? (
            <FormattedMsgMedParagrafer
              id="apningstid.avvik.apent"
              values={{dato: datoFormat(datoTidsrom.dato), start: datoTidsrom.tidsrom.start, end: datoTidsrom.tidsrom.end}}
              key={`tid${index}`}
            />
          )
          : (
            <FormattedMsgMedParagrafer
              id="apningstid.avvik.stengt"
              values={{dato: datoFormat(datoTidsrom.dato)}}
              key={`tid${index}`}
            />
          )
      ))}
    </div>
  ) : null;
};

export default ApningstiderAvvik;
