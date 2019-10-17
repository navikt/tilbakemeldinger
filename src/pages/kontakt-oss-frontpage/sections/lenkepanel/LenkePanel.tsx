import React from "react";
import eksterneLenker from "./LenkePanelData";
import LinkBox from "./linkbox/LinkBox";
import PanelBase from "nav-frontend-paneler";

const LenkePanel = () => {
  return (
    <PanelBase className="el__panel">
      <div className="el__content">
        {eksterneLenker.map(link => (
          <LinkBox
            id={link.id}
            key={link.id}
            icon={link.icon}
            tittel={link.tittel}
            beskrivelse={link.beskrivelse}
            lenkeTekst={link.lenkeTekst}
            to={link.url}
            component={"a"}
          />
        ))}
      </div>
    </PanelBase>
  );
};

export default LenkePanel;
