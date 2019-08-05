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
import { HTTPError } from "../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";

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
  const [loading, settLoading] = useState(false);
  const [submitted, settSubmitted] = useState(false);
  const [error, settError] = useState();

  const send = () => {
    settLoading(true);
    settSubmitted(true);
    postRosTilNav({
      navn,
      telefonnummer,
      hvemRoses,
      melding
    })
      .then(() => {
        props.history.push(`${props.location.pathname}/takk`);
      })
      .catch((error: HTTPError) => {
        settError(`${error.code} - ${error.text}`);
      })
      .then(() => {
        settLoading(false);
      });
  };

  return (
    <>
      <Tilbake />
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Takk for at du vil dele din opplevelse med oss! Vi sørger for at rosen
        kommer fram til riktig person. Unngå å nevne sensitive
        personopplysninger, som for eksempel opplysninger om helseforhold eller
        diagnoser.
      </Veilederpanel>
      <div className="flex__rad mellomrom">
        <div className="flex__kolonne-left">
          <InputNavn value={navn} onChange={settNavn} submitted={submitted} />
        </div>
        <div className="flex__kolonne-right">
          <InputTelefon
            value={telefonnummer}
            onChange={settTlfnr}
            submitted={submitted}
          />
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
        feilmelding={"Du må velge hvem du skal gi ros til"}
        legend={"Hvem vil du gi ros til? *"}
        onChange={settHvemRoses}
        submitted={submitted}
      />
      <div className="mellomrom">
        <InputMelding
          onChange={settMelding}
          value={melding}
          submitted={submitted}
        />
      </div>
      <div>
        {error && <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>}
      </div>
      <div className="tb__knapper">
        <div className="tb__knapp">
          <Hovedknapp onClick={send} disabled={loading}>
            {loading ? <NavFrontendSpinner type={"S"} /> : "Send"}
          </Hovedknapp>
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
