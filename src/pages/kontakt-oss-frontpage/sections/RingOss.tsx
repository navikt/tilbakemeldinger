import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import Lenke from "nav-frontend-lenker";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { spesialnr, tastevalg } from "./RingOssData";

const RingOss = () => {
  const [visNummer, settVisNummer] = useState(false);
  return (
    <Box icon={VeilederIcon} margin={"2rem 0"}>
      <div className={"box__section"}>
        <div className={"box__section-title"}>
          <Undertittel className="box__title">Ring oss</Undertittel>
        </div>
        <div className={"box__section-description"}>
          Vi hjelper deg med generelle spørsmål og veiledning hverdager mellom
          08:00 - 15:00. Svartiden varierer, men det er kortest ventetid mellom
          10:00-13:00
        </div>
        <div
          className={"ringoss__visnr box__section-lenke lenke "}
          onClick={() => settVisNummer(!visNummer)}
        >
          {visNummer ? (
            <>
              <span>Skjul telefonnumre og tastevalg</span>
              <OppChevron />
            </>
          ) : (
            <>
              <span>Vis telefonnumre og tastevalg</span>
              <NedChevron />
            </>
          )}
        </div>
        {visNummer && (
          <>
            <div className={"ringoss__tlf"}>
              <Undertittel>Personbruker: 55 55 33 33</Undertittel>
            </div>
            <div className={"ringoss__apningstider"}>
              Apent hverdager kl. 08.00 - 15.30. Åpningstidene kan endres, men
              da får du beskjed på telefonen.
            </div>
            <table className="ringoss__tabell-tastevalg tabell">
              <thead>
                <tr>
                  <th className="ringoss__kolonne">Tastevalg</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {tastevalg.map(valg => (
                  <tr key={valg.tastevalg}>
                    <td>{valg.tastevalg}</td>
                    <td>{valg.beskrivelse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <table className="ringoss__tabell-spesialnr tabell">
              <thead>
                <tr>
                  <th className="ringoss__kolonne">Spesialnumre</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {spesialnr.map(valg => (
                  <tr key={valg.nummer}>
                    <td>{valg.nummer}</td>
                    <td>{valg.beskrivelse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={"faq__lenke"}>
              <Lenke href={"#"}>
                Råd og veiledning for veteraner fra Forsvaret
              </Lenke>
            </div>
            <div className={"faq__lenke"}>
              <Lenke href={"#"} className={"faq__lenke"}>
                Ringer du på vegne av en annen?
              </Lenke>
            </div>
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
          </>
        )}
      </div>
    </Box>
  );
};

export default RingOss;
