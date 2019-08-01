import React, { useState } from "react";
import VeilederIcon from "../../assets/Veileder.svg";
import Veilederpanel from "nav-frontend-veilederpanel";
import Tilbake from "../../components/tilbake/Tilbake";
import { useStore } from "../../providers/Provider";
import { RadioPanelGruppe } from "nav-frontend-skjema";
import InputMelding from "../../components/input-fields/InputMelding";
import InputTelefon from "../../components/input-fields/InputTelefon";
import InputNavn from "../../components/input-fields/InputNavn";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { baseUrl } from "../../App";

const ServiceKlage = (props: RouteComponentProps) => {
  document.title = "ServiceKlage - www.nav.no";
  const [{ auth }] = useStore();
  const [navn, settNavn] = useState("");
  const [telefonnummer, settTlfnr] = useState("");
  const [hvaGjelder, settHvaGjelder] = useState();
  const [onskerKontakt, settOnskerKontakt] = useState();
  const [hvemFra, settHvemFra] = useState();
  const [melding, settMelding] = useState("");

  const onHvaGjelderChange = (
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ) => settHvaGjelder(value);

  const onHvemFrahange = (
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ) => settHvemFra(value);

  const onOnskerKontaktChange = (
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ) => settOnskerKontakt(value);

  const send = () => console.log("Send");

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
        <div className="ros-til-nav__rad">
          <div
            className="ros-til-nav__kolonne ros-til-nav__felt"
            style={{ paddingRight: "0.25rem" }}
          >
            <InputNavn value={navn} onChange={settNavn} />
          </div>
          <div
            className="ros-til-nav__kolonne ros-til-nav__felt"
            style={{ paddingLeft: "0.25rem" }}
          >
            <InputTelefon value={telefonnummer} onChange={settTlfnr} />
          </div>
        </div>
        <RadioPanelGruppe
          radios={[
            { label: "Saksbehandling av søknad", value: "saksbehandling" },
            { label: "NAV-kontor", value: "nav-kontor" },
            { label: "Telefon", value: "telefon" },
            { label: "nav.no", value: "nettside" },
            { label: "Annet", value: "annet" }
          ]}
          checked={hvaGjelder}
          name={"hva-gjelder-tilbakemeldingen"}
          legend={"Hva gjelder tilbakemeldingen? *"}
          onChange={onHvaGjelderChange}
        />
        <RadioPanelGruppe
          radios={[
            { label: "Meg selv som privatperson", value: "meg-selv" },
            { label: "Annen privatperson", value: "annen-privatperson" },
            { label: "Bedrift", value: "bedrift" }
          ]}
          checked={hvemFra}
          name={"hvem-fra"}
          legend={"Hvem skriver du på vegne av? *"}
          onChange={onHvemFrahange}
        />
        <RadioPanelGruppe
          radios={[
            { label: "Ja, jeg ønsker å kontaktes", value: "onsker-kontakt" },
            {
              label: "Nei, jeg ville bare si ifra",
              value: "onsker-ikke-kontakt"
            }
          ]}
          checked={onskerKontakt}
          name={"onsker-kontakt"}
          legend={"Ønsker du at vi kontakter deg? *"}
          onChange={onOnskerKontaktChange}
        />
        <InputMelding onChange={settMelding} value={melding} />
        <div className="ros-til-nav__knapper">
          <div className="ros-til-nav__knapp">
            <Hovedknapp onClick={send}>Send</Hovedknapp>
          </div>
          <div className="ros-til-nav__knapp">
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
