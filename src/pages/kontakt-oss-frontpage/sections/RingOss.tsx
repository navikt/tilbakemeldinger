import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { spesialnr, tastevalg } from "./RingOssData";
import { urls } from "../../../Config";
import { FormattedMessage } from "react-intl";
import IkonPanel from "../../../components/ikonpanel/IkonPanel";

import ikon from "assets/forside-ringoss-ikon.svg";
import ChevronLenke from "../../../components/chevronlenke/ChevronLenke";

const RingOss = () => {
  const tittel = <FormattedMessage id={"kontaktoss.ringoss.tittel"} />;
  const [visNummer, settVisNummer] = useState(false);

  return (
    <IkonPanel ikon={ikon} tittel={tittel} className="ringoss">
      <button
        className={"frontpage__lenke ringoss__visnr box__section-lenke lenke"}
        onClick={() => settVisNummer(!visNummer)}
      >
        {visNummer ? (
          <>
            <span>
              <FormattedMessage id={"kontaktoss.ringoss.skjultlf"} />
            </span>
            <OppChevron />
          </>
        ) : (
          <>
            <span>
              <FormattedMessage id={"kontaktoss.ringoss.vistlf"} />
            </span>
            <NedChevron />
          </>
        )}
      </button>
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
            <ChevronLenke href={urls.veteraner} isExternal={true}>
              <FormattedMessage id={"kontaktoss.ringoss.forsvaret"} />
            </ChevronLenke>
          </div>
          <div className={"faq__lenke"}>
            <ChevronLenke href={urls.samtykke} className={"faq__lenke"}>
              <FormattedMessage id={"kontaktoss.ringoss.forandre"} />
            </ChevronLenke>
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
    </IkonPanel>
  );
};

export default RingOss;
