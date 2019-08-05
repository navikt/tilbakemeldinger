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
import { postFeilOgMangler } from "../../clients/apiClient";
import Tilbake from "../../components/tilbake/Tilbake";
import { HTTPError } from "../../components/error/Error";
import { AlertStripeFeil } from "nav-frontend-alertstriper";
import NavFrontendSpinner from "nav-frontend-spinner";

export interface OutboundFeilOgMangler {
  navn: string;
  telefonnummer: string;
  feiltype: string;
  melding: string;
}

const FOM = (props: RouteComponentProps) => {
  document.title = "Feil og mangler - www.nav.no";
  const [navn, settNavn] = useState("");
  const [telefonnummer, settTlfnr] = useState("");
  const [melding, settMelding] = useState("");
  const [feiltype, settFeiltype] = useState();
  const [loading, settLoading] = useState(false);
  const [error, settError] = useState();
  const [submitted, settSubmitted] = useState(false);

  const send = () => {
    settLoading(true);
    settSubmitted(true);
    postFeilOgMangler({
      navn,
      telefonnummer,
      feiltype,
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
        Takk for at du sier ifra om feil og mangler. Vi sørger for at meldingen
        kommer fram til riktig person.
      </Veilederpanel>
      <div className="flex__rad mellomrom">
        <div className="flex__kolonne-left">
          <InputNavn value={navn} onChange={settNavn} />
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
          { label: "Teknisk feil", value: "teknisk-feil" },
          { label: "Feil informasjon", value: "feil-informasjon" },
          {
            label: "Lav grad av universell utforming",
            value: "universell-utforming"
          }
        ]}
        feilmelding={"Du må velge hvilken type feil eller mangel du fant"}
        checked={feiltype}
        name={"type-feil"}
        legend={"Hva slags feil eller mangel fant du? *"}
        onChange={settFeiltype}
        submitted={submitted}
      />
      <div className="mellomrom">
        <InputMelding
          onChange={settMelding}
          value={melding}
          submitted={submitted}
        />
      </div>
      {error && <AlertStripeFeil>Oi! Noe gikk galt: {error}</AlertStripeFeil>}
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
export default withRouter(FOM);
