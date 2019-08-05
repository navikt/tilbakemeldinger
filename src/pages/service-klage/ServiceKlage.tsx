import React, { useState } from "react";
import VeilederIcon from "../../assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Tilbake from "../../components/tilbake/Tilbake";
import { useStore } from "../../providers/Provider";
import RadioPanelGruppe from "../../components/input-fields/RadioPanelGruppe";
import InputMelding from "../../components/input-fields/InputMelding";
import InputNavn from "../../components/input-fields/InputNavn";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { baseUrl } from "../../App";
import InputTelefon from "../../components/input-fields/InputTelefon";
import InputFodselsnr from "../../components/input-fields/InputFodselsnr";

import { Element } from "nav-frontend-typografi";
import { postServiceKlage } from "../../clients/apiClient";
import InputField from "../../components/input-fields/InputField";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";
import { HTTPError } from "../../components/error/Error";

export type ON_BEHALF_OF = "PRIVATPERSON" | "ANNEN_PERSON" | "BEDRIFT";

type OutboundServiceKlageBase = {
  klagetype: string;
  klagetekst: string;
  oenskerAaKontaktes: boolean;
};

type OutboundServiceKlageExtend =
  | {
      paaVegneAv: "PRIVATPERSON";
      innmelder: {
        navn: string;
        telefonnummer: string;
        personnummer: string;
      };
    }
  | {
      paaVegneAv: "ANNEN_PERSON";
      innmelder: {
        navn: string;
        telefonnummer: string;
        harFullmakt: boolean;
        rolle: string;
      };
      paaVegneAvPerson: {
        navn: string;
        personnummer: string;
      };
    }
  | {
      paaVegneAv: "BEDRIFT";
      innmelder: {
        navn: string;
        telefonnummer: string;
        rolle: string;
      };
      paaVegneAvBedrift: {
        navn: string;
        organisasjonsnummer: string;
        postadresse: string;
        telefonnummer: string;
      };
    };

export type OutboundServiceKlage = OutboundServiceKlageBase &
  OutboundServiceKlageExtend;

const ServiceKlage = (props: RouteComponentProps) => {
  document.title = "ServiceKlage - www.nav.no";

  const [{ auth }] = useStore();
  const [innsenderNavn, settInnsenderNavn] = useState("");
  const [paaVegneAvNavn, settPaaVegneAvNavn] = useState("");
  const [paaVegneAvFodselsnr, settPaaVegneAvFodselsnr] = useState("");
  const [fodsensnummer, settFodselsnummer] = useState("");
  const [rolle, settRolle] = useState("");
  const [fullmakt, settFullmakt] = useState("");
  const [telefonnummer, settTlfnr] = useState("");
  const [hvaGjelder, settHvaGjelder] = useState();
  const [onskerKontakt, settOnskerKontakt] = useState();
  const [hvemFra, settHvemFra] = useState<ON_BEHALF_OF>();
  const [melding, settMelding] = useState("");
  const [orgNavn, settOrgNavn] = useState("");
  const [orgNummer, settOrgNummer] = useState("");
  const [orgPostadr, settOrgPostadr] = useState("");
  const [orgTlfNr, settOrgTlfNr] = useState("");
  const [loading, settLoading] = useState(false);
  const [submitted, settSubmitted] = useState(false);
  const [error, settError] = useState();

  const hasEmptyFields = () => {
    if (!hvaGjelder || !hvemFra || !melding || !innsenderNavn) {
      return true;
    }

    if (!onskerKontakt || (onskerKontakt && !telefonnummer)) {
      return true;
    }

    return {
      PRIVATPERSON: !fodsensnummer,
      ANNEN_PERSON:
        !fullmakt || !rolle || !paaVegneAvNavn || !paaVegneAvFodselsnr,
      BEDRIFT: !orgNavn || !orgPostadr || !orgNummer || !orgTlfNr
    }[hvemFra]
      ? true
      : false;
  };
  const send = () => {
    settSubmitted(true);
    if (hvemFra) {
      const outboundBase: OutboundServiceKlageBase = {
        klagetype: hvaGjelder,
        klagetekst: melding,
        oenskerAaKontaktes: onskerKontakt === "true" ? true : false
      };

      const outboundExtend: {
        [key in ON_BEHALF_OF]: OutboundServiceKlageExtend;
      } = {
        PRIVATPERSON: {
          paaVegneAv: "PRIVATPERSON",
          innmelder: {
            navn: innsenderNavn,
            telefonnummer: telefonnummer,
            personnummer: fodsensnummer
          }
        },
        ANNEN_PERSON: {
          paaVegneAv: "ANNEN_PERSON",
          innmelder: {
            navn: innsenderNavn,
            telefonnummer: telefonnummer,
            harFullmakt: fullmakt === "true" ? true : false,
            rolle: rolle
          },
          paaVegneAvPerson: {
            navn: paaVegneAvNavn,
            personnummer: paaVegneAvFodselsnr
          }
        },
        BEDRIFT: {
          paaVegneAv: "BEDRIFT",
          innmelder: {
            navn: innsenderNavn,
            telefonnummer: telefonnummer,
            rolle: rolle
          },
          paaVegneAvBedrift: {
            navn: orgNavn,
            postadresse: orgPostadr,
            organisasjonsnummer: orgNummer,
            telefonnummer: orgTlfNr
          }
        }
      };

      const outbound = {
        ...outboundBase,
        ...outboundExtend[hvemFra]
      };

      console.log(outbound);
      settLoading(true);
      postServiceKlage(outbound)
        .then(() => {
          props.history.push(`${props.location.pathname}/takk`);
        })
        .catch((error: HTTPError) => {
          settError(`${error.code} - ${error.text}`);
        })
        .then(() => {
          settLoading(false);
        });
    }
  };

  const Navn = () => (
    <div>
      <Element>Innsender</Element>
      <div className="flex__rad">
        <div className="flex__kolonne-left">
          <InputNavn value={innsenderNavn} onChange={settInnsenderNavn} />
        </div>
        <div className="flex__kolonne-right">
          <InputFodselsnr onChange={settFodselsnummer} value={fodsensnummer} />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Tilbake to={auth.authenticated ? "" : "/service-klage/login"} />
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Takk for at du vil dele din opplevelse med oss! Vi sørger for at rosen
        kommer fram til riktig person. Unngå å nevne sensitive
        personopplysninger, som for eksempel opplysninger om helseforhold eller
        diagnoser.
      </Veilederpanel>
      <div className="serviceKlage__content">
        <RadioPanelGruppe
          radios={[
            { label: "Saksbehandling av søknad", value: "SAKSBEHANDLING" },
            { label: "NAV-kontor", value: "NAV_KONTOR" },
            { label: "Telefon", value: "TELEFON" },
            { label: "nav.no", value: "NAVNO" },
            { label: "Annet", value: "ANNET" }
          ]}
          checked={hvaGjelder}
          name={"hva-gjelder-tilbakemeldingen"}
          legend={"Hva gjelder tilbakemeldingen? *"}
          onChange={settHvaGjelder}
        />
        <RadioPanelGruppe
          radios={[
            {
              label: "Meg selv som privatperson",
              value: "PRIVATPERSON" as ON_BEHALF_OF
            },
            {
              label: "Annen privatperson",
              value: "ANNEN_PERSON" as ON_BEHALF_OF
            },
            { label: "Bedrift", value: "BEDRIFT" as ON_BEHALF_OF }
          ]}
          checked={hvemFra}
          name={"hvem-fra"}
          legend={"Hvem skriver du på vegne av? *"}
          onChange={settHvemFra}
        />
        {hvemFra &&
          {
            PRIVATPERSON: Navn(),
            ANNEN_PERSON: (
              <div>
                {Navn()}
                <Element>På vegne av:</Element>
                <div className="flex__rad">
                  <div className="flex__kolonne-left">
                    <InputField
                      label={"Navn *"}
                      value={paaVegneAvNavn}
                      onChange={settPaaVegneAvNavn}
                    />
                  </div>
                  <div className="flex__kolonne-right">
                    <InputField
                      label={"Fødselsnummer *"}
                      value={paaVegneAvFodselsnr}
                      onChange={settPaaVegneAvFodselsnr}
                    />
                  </div>
                </div>
                <InputField
                  label={"Rolle *"}
                  value={rolle}
                  onChange={settRolle}
                />
                <RadioPanelGruppe
                  className="radioPanel__bool"
                  radios={[
                    {
                      label: "Ja, jeg har fullmakt",
                      value: "true"
                    },
                    {
                      label: "Nei, jeg har ikke fullmakt",
                      value: "false"
                    }
                  ]}
                  checked={fullmakt}
                  name={"fullmakt"}
                  legend={"Har du fullmakt? *"}
                  onChange={settFullmakt}
                />
              </div>
            ),
            BEDRIFT: (
              <>
                <div className="flex__rad">
                  <div className="flex__kolonne-left ">
                    <InputField
                      label={"Organisasjonsnavn *"}
                      value={orgNavn}
                      onChange={settOrgNavn}
                    />
                  </div>
                  <div className="flex__kolonne-right">
                    <InputField
                      label={"Organisasjonsnummer *"}
                      value={orgNummer}
                      onChange={settOrgNummer}
                    />
                  </div>
                </div>
                <div className="flex__rad">
                  <div className="flex__kolonne-left">
                    <InputField
                      label={"Postadresse *"}
                      value={orgPostadr}
                      onChange={settOrgPostadr}
                    />
                  </div>
                  <div className="flex__kolonne-right">
                    <InputField
                      label={"Bedriftens telefonnummer *"}
                      value={orgTlfNr}
                      onChange={settOrgTlfNr}
                    />
                  </div>
                </div>
              </>
            )
          }[hvemFra]}
        <RadioPanelGruppe
          className="radioPanel__bool"
          radios={[
            {
              label: "Ja, jeg ønsker å kontaktes",
              value: "true"
            },
            {
              label: "Nei, jeg ville bare si ifra",
              value: "false"
            }
          ]}
          checked={onskerKontakt}
          name={"onsker-kontakt"}
          legend={"Ønsker du at vi kontakter deg? *"}
          onChange={settOnskerKontakt}
        />

        {onskerKontakt === "true" && (
          <InputTelefon
            onChange={settTlfnr}
            value={telefonnummer}
            submitted={submitted}
          />
        )}
        <InputMelding onChange={settMelding} value={melding} />
        {error && <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>}
        <div className="tb__knapper">
          <div className="tb__knapp">
            <Hovedknapp onClick={send} disabled={loading || hasEmptyFields()}>
              {loading ? <NavFrontendSpinner type={"S"} /> : "Send"}
            </Hovedknapp>
          </div>
          <div className="tb__knapp">
            <Link to={baseUrl}>
              <Knapp>Tilbake</Knapp>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(ServiceKlage);
