import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { spesialnr, tastevalg } from "./RingOssData";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";

const RingOss = () => {
  const [visNummer, settVisNummer] = useState(false);
  return (
    <>
      <div className={"box__section"}>
        <div className={"box__section-title"}>
          <Undertittel className="box__title">
            <FormattedMessage id={"kontaktoss.ringoss.tittel"} />
          </Undertittel>
        </div>
        <div className={"box__section-description"}>
          <FormattedMessage id={"kontaktoss.ringoss.beskrivelse"} />
        </div>
        <div
          className={"ringoss__visnr box__section-lenke lenke "}
          onClick={() => settVisNummer(!visNummer)}
        >
          {visNummer ? (
            <>
              <FormattedMessage id={"kontaktoss.ringoss.skjultlf"} />
              <OppChevron />
            </>
          ) : (
            <>
              <FormattedMessage id={"kontaktoss.ringoss.vistlf"} />
              <NedChevron />
            </>
          )}
        </div>
        {visNummer && (
          <>
            <div className={"ringoss__tlf"}>
              <Undertittel>
                <FormattedMessage id={"kontaktoss.ringoss.tlf"} />
              </Undertittel>
            </div>
            <table className="ringoss__tabell-tastevalg tabell">
              <thead>
                <tr>
                  <th className="ringoss__kolonne">
                    <FormattedMessage id={"kontaktoss.ringoss.tastevalg"} />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tastevalg.map(valg => (
                  <tr key={valg.tastevalg}>
                    <td className="ringoss__kolonne">
                      <FormattedMessage id={valg.tastevalg} />
                    </td>
                    <td>
                      <FormattedMessage id={valg.beskrivelse} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="ringoss__tabell-spesialnr tabell">
              <thead>
                <tr>
                  <th className="ringoss__kolonne">
                    <FormattedMessage id={"kontaktoss.ringoss.spesialnr"} />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {spesialnr.map(valg => (
                  <tr key={valg.nummer}>
                    <td className="ringoss__kolonne">{valg.nummer}</td>
                    <td>
                      <FormattedMessage id={valg.beskrivelse} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={"faq__lenke"}>
              <Lenke href={urls.veteraner}>
                <FormattedMessage id={"kontaktoss.ringoss.forsvaret"} />
              </Lenke>
            </div>
            <div className={"faq__lenke"}>
              <Lenke href={"#"} className={"faq__lenke"}>
                <FormattedMessage id={"kontaktoss.ringoss.forandre"} />
              </Lenke>
            </div>
            {/*
              <div className={"ringoss__andre"}>
                <Undertittel>Andre</Undertittel>
              </div>
              <div className={"faq__lenke"}>
                <Lenke href={"#"} className={"faq__lenke"}>
                  Kontaktinformasjon for arbeidsgivere
                </Lenke>
              </div>
              <div className={"faq__lenke"}>
                <Lenke href={"#"} className={"faq__lenke"}>
                  Lege-/Behandlertelefonen
                </Lenke>
              </div>
              <div className={"faq__lenke"}>
                <Lenke href={"#"} className={"faq__lenke"}>
                  Pressekontakt
                </Lenke>
              </div>
               */}
          </>
        )}
      </div>
    </>
  );
};

export default RingOss;
