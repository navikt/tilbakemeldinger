import React from "react";
import { lenker } from "./TilbakemeldingerLenker";
import Header from "../../components/header/Header";
import Lenkepanel from "../../components/lenkepanel/Lenkepanel";
import { useIntl } from "react-intl";
import { useStore } from "../../providers/Provider";
import { useAmplitudeLogger } from "../../hooks/useAmplitudeLogger";

const Tilbakemeldinger = () => {
  useAmplitudeLogger("tilbakemeldinger.sidetittel");

  const intl = useIntl();
  const [{ locale }] = useStore();

  return (
    <>
      <div role={"main"} className="pagecontent">
        <div className={"tilbakemeldinger__tittel"}>
          <Header
            title={intl.formatMessage({ id: "tilbakemeldinger.sidetittel" })}
          />
        </div>
        {lenker(locale).map((lenke) => (
          <Lenkepanel
            icon={lenke.icon}
            key={lenke.tittel}
            id={lenke.tittel}
            tittel={intl.messages[lenke.tittel] as string}
            beskrivelse={lenke.beskrivelse}
            to={lenke.lenke}
            lenkeTekst={intl.messages[lenke.lenkeTekst] as string}
            external={lenke.external}
          />
        ))}
      </div>
    </>
  );
};
export default Tilbakemeldinger;
