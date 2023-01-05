import React from "react";
import { BodyShort, Panel } from "@navikt/ds-react";

interface Props {
  tittel?: string;
  beskrivelse?: string;
  icon?: string;
  wrapperClassName?: string;
  contentClassName?: string;
  containerClassName?: string;
  margin?: string;
  children: JSX.Element | JSX.Element[];
}

const Box = (props: Props) => {
  const { children, tittel } = props;
  const { containerClassName, wrapperClassName, contentClassName } = props;
  const styles = { margin: props.margin ? props.margin : "1rem 0 0 0" };
  return (
    <div className={`box__wrapper ${wrapperClassName || ""}`} style={styles}>
      <Panel>
        <div className={`box__container ${containerClassName || ""}`}>
          {tittel && (
            <div className="box__header">
              <div className="box__title-container">
                <BodyShort size={"small"} className="box__title">
                  {tittel}
                </BodyShort>
                <div className="box__line" />
              </div>
            </div>
          )}
          <div className={`box__content ${contentClassName || ""}`}>
            {children}
          </div>
        </div>
      </Panel>
    </div>
  );
};

export default Box;
