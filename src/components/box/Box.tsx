import React from "react";
import { Systemtittel } from "nav-frontend-typografi";
import PanelBase from "nav-frontend-paneler";

interface Props {
  tittel?: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props) => {
  const { children, tittel } = props;
  /*
  const iconImg = icon ? (
    <img src={icon} className="box__ikon" alt="Veileder" />
  ) : null;
  */

  return (
    <div className="box__wrapper">
      <PanelBase>
        <div className="box__container">
          {tittel && (
            <div className="box__header">
              <div className="box__title-container">
                <Systemtittel className="box__title">{tittel}</Systemtittel>
                <div className="box__line" />
              </div>
            </div>
          )}
          <div className="box__content">{children}</div>
        </div>
      </PanelBase>
    </div>
  );
};

export default Box;
