import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import { RadioPanelGruppe } from "nav-frontend-skjema";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { baseUrl } from "../../App";
import InputNavn from "../../components/input-fields/InputNavn";
import InputTelefon from "../../components/input-fields/InputTelefon";
import InputMelding from "../../components/input-fields/InputMelding";
import { postFeilOgMangler } from "../../clients/apiClient";
import Tilbake from "../../components/tilbake/Tilbake";
import { useStore } from "../../providers/Provider";

export interface FeilOgMangler {
  navn: string;
  telefonnummer: string;
  feiltype: string;
  melding: string;
}

const FOM = (props: RouteComponentProps) => {
  document.title = "Feil og mangler - www.nav.no";
  const [{ kontaktInfo }] = useStore();
  const [navn, settNavn] = useState("");
  const [telefonnummer, settTlfnr] = useState(
    kontaktInfo.mobiltelefonnummer || ""
  );
  const [melding, settMelding] = useState("");
  const [feiltype, settFeiltype] = useState();

  const onSettFeiltypeClick = (
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ) => settFeiltype(value);

  const send = () =>
    postFeilOgMangler({
      navn,
      telefonnummer,
      feiltype,
      melding
    })
      .then(() => props.history.push(`${props.location.pathname}/takk`))
      .catch(console.error);

  return (
    <>
      <Tilbake />
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Takk for at du sier ifra om feil og mangler. Vi sørger for at meldingen
        kommer fram til riktig person.
      </Veilederpanel>
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
          { label: "Teknisk feil", value: "teknisk-feil" },
          { label: "Feil informasjon", value: "feil-informasjon" },
          {
            label: "Lav grad av universell utforming",
            value: "universell-utforming"
          }
        ]}
        checked={feiltype}
        name={"type-feil"}
        legend={"Hva slags feil eller mangel fant du? *"}
        onChange={onSettFeiltypeClick}
      />
      <div className="ros-til-nav__felt">
        <InputMelding onChange={settMelding} value={melding} />
      </div>
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
    </>
  );
};
export default withRouter(FOM);
