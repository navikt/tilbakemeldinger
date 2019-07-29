import React, { useState } from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import VeilederIcon from "../../assets/Veileder.svg";
import {
  Input,
  RadioPanelGruppe,
  TextareaControlled
} from "nav-frontend-skjema";
import { Hovedknapp, Knapp } from "nav-frontend-knapper";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Lenke from "nav-frontend-lenker";
import { baseUrl } from "../../App";
import InputNavn from "../../components/input-navn/InputNavn";

const Ros = (props: RouteComponentProps) => {
  document.title = "Ros til NAV - www.nav.no";
  const [rosTilHvem, settRosTilHvem] = useState();

  const onRosTilHvemClick = (
    event: React.SyntheticEvent<EventTarget>,
    value: string
  ) => settRosTilHvem(value);

  const send = () => {
    console.log("Send");
    props.history.push(`${props.location.pathname}/takk`);
  };

  return (
    <>
      <div className="ros-til-nav__felt">
        <Lenke href={baseUrl}>Tilbake</Lenke>
      </div>
      <Veilederpanel svg={<img src={VeilederIcon} alt="Veileder" />}>
        Takk for at du vil dele din opplevelse med oss! Vi sørger for at rosen
        kommer fram til riktig person. Unngå å nevne sensitive
        personopplysninger, som for eksempel opplysninger om helseforhold eller
        diagnoser.
      </Veilederpanel>
      <div className="ros-til-nav__rad">
        <div
          className="ros-til-nav__kolonne ros-til-nav__felt"
          style={{ paddingRight: "0.25rem" }}
        >
          <InputNavn />
        </div>
        <div
          className="ros-til-nav__kolonne ros-til-nav__felt"
          style={{ paddingLeft: "0.25rem" }}
        >
          <Input label={"Telefonnummer"} />
        </div>
      </div>
      <RadioPanelGruppe
        radios={[
          { label: "NAV Kontaktsenter", value: "nav-kontaktsenter" },
          { label: "NAVs digitale løsninger", value: "nav-digitale-losninger" },
          { label: "NAV-kontor", value: "nav-kontor" }
        ]}
        checked={rosTilHvem}
        name={"ros-til-hvem"}
        legend={"Hvem vil du gi ros til? *"}
        onChange={onRosTilHvemClick}
      />
      <div className="ros-til-nav__felt">
        <TextareaControlled
          defaultValue={""}
          label={"Melding til NAV *"}
          required={true}
        />
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
export default withRouter(Ros);
