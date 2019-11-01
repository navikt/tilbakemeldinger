import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import PanelBase from "nav-frontend-paneler";

interface Props {
  tittel?: string;
  beskrivelse?: string;
  icon?: string;
  wrapperClassName?: string;
  containerClassName?: string;
  margin?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props) => {
  const { children, tittel, containerClassName, wrapperClassName } = props;
  const styles = { margin: props.margin ? props.margin : "1rem 0 0 0" };
  return (
    <div className={`box__wrapper ${wrapperClassName || ""}`} style={styles}>
      <PanelBase>
        <div className={`box__container ${containerClassName || ""}`}>
          {tittel && (
            <div className="box__header">
              <div className="box__title-container">
                <Undertittel className="box__title">{tittel}</Undertittel>
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
