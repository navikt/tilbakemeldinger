import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import RadioPanelGruppe from "../../components/input-fields/RadioPanelGruppe";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { baseUrl } from "../../App";
import InputNavn from "../../components/input-fields/InputNavn";
import InputTelefon from "../../components/input-fields/InputTelefon";
import InputMelding from "../../components/input-fields/InputMelding";
import { postRosTilNav } from "../../clients/apiClient";
import Tilbake from "../../components/tilbake/Tilbake";

export interface OutboundRosTilNav {
  navn: string;
  telefonnummer: string;
  hvemRoses: string;
  melding: string;
}

const Ros = (props: RouteComponentProps) => {
  document.title = "Ros til NAV - www.nav.no";

  const [navn, settNavn] = useState("");
  const [telefonnummer, settTlfnr] = useState("");
  const [melding, settMelding] = useState("");
  const [hvemRoses, settHvemRoses] = useState();

  const send = () =>
    postRosTilNav({
      navn,
      telefonnummer,
      hvemRoses,
      melding
    })
      .then(() => props.history.push(`${props.location.pathname}/takk`))
      .catch(console.error);

  return (
    <>
      <Tilbake />
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Takk for at du vil dele din opplevelse med oss! Vi sørger for at rosen
        kommer fram til riktig person. Unngå å nevne sensitive
        personopplysninger, som for eksempel opplysninger om helseforhold eller
        diagnoser.
      </Veilederpanel>
      <div className="flex__rad">
        <div className="flex__kolonne-left">
          <InputNavn value={navn} onChange={settNavn} />
        </div>
        <div className="flex__kolonne-right">
          <InputTelefon value={telefonnummer} onChange={settTlfnr} />
        </div>
      </div>
      <RadioPanelGruppe
        radios={[
          { label: "NAV Kontaktsenter", value: "nav-kontaktsenter" },
          { label: "NAVs digitale løsninger", value: "nav-digitale-losninger" },
          { label: "NAV-kontor", value: "nav-kontor" }
        ]}
        checked={hvemRoses}
        name={"ros-til-hvem"}
        legend={"Hvem vil du gi ros til? *"}
        onChange={settHvemRoses}
      />
      <div className="mellomrom">
        <InputMelding onChange={settMelding} value={melding} />
      </div>
      <div className="tb__knapper">
        <div className="tb__knapp">
          <Hovedknapp onClick={send}>Send</Hovedknapp>
        </div>
        <div className="tb__knapp">
          <Link to={baseUrl}>
            <Knapp>Tilbake</Knapp>
          </Link>
        </div>
      </div>
    </>
  );
};
export default withRouter(Ros);
