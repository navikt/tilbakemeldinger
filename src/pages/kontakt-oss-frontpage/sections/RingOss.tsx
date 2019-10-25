import React, { useState } from "react";
import { Undertittel } from "nav-frontend-typografi";
import VeilederIcon from "assets/Veileder.svg";
import Box from "components/box/Box";
import Lenke from "nav-frontend-lenker";

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
          className={"box__section-lenke lenke"}
          onClick={() => settVisNummer(!visNummer)}
        >
          {visNummer
            ? "Skjul telefonnumre og tastevalg"
            : "Vis telefonnumre og tastevalg"}
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
                <tr>
                  <td>Tast 1</td>
                  <td>
                    Økonomisk sosialhjelp, midlertidig botilbud eller andre
                    sosiale tjenester
                  </td>
                </tr>
                <tr>
                  <td>Tast 2</td>
                  <td>
                    Arbeidssøker, dagpenger, arbeidsavklaringspenger eller
                    sykemeldt
                  </td>
                </tr>
                <tr>
                  <td>Tast 3</td>
                  <td>
                    Foreldrepenger, engangsstønad, svangerskapspenger,
                    barnebidrag, barnetrygd, kontantstøtte, enslig forsørger,
                    pleiepenger og andre familieytelser
                  </td>
                </tr>
                <tr>
                  <td>Tast 4</td>
                  <td>Uføretrygd og honnørkort</td>
                </tr>
                <tr>
                  <td>Tast 5</td>
                  <td>Andre henvendelser</td>
                </tr>
              </tbody>
            </table>
            <table className="ringoss__tabell-spesialnr tabell">
              <thead>
                <tr>
                  <th className="ringoss__kolonne">Spsialnumre</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>55 55 33 34</td>
                  <td>Pensjon</td>
                </tr>
                <tr>
                  <td>55 55 33 35</td>
                  <td>Hjelpemidler</td>
                </tr>
                <tr>
                  <td>55 55 33 39</td>
                  <td>Teknisk brukerstøtte / EURES / gjeldsrådgivning</td>
                </tr>
                <tr>
                  <td>(+47) 21 07 37 00</td>
                  <td>Internasjonalt</td>
                </tr>
                <tr>
                  <td>22 82 20 00</td>
                  <td>Lønnsgaranti</td>
                </tr>
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
