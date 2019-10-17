import React from "react";
import Veilederpanel from "nav-frontend-veilederpanel";
import { Systemtittel } from "nav-frontend-typografi";

interface Props {
  tittel?: string;
  beskrivelse?: string;
  icon?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props) => {
  const { icon, children, tittel } = props;
  const iconImg = icon ? (
    <img src={icon} className="box__ikon" alt="Veileder" />
  ) : null;

  return (
    <div className="box__wrapper">
      <Veilederpanel svg={iconImg} type={"plakat"} kompakt={true}>
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
      </Veilederpanel>
    </div>
  );
};

export default Box;
