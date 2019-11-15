import React from "react";

import { Systemtittel } from "nav-frontend-typografi";
import PanelBase, { Panel } from "nav-frontend-paneler";

type Props = {
  ikon?: string;
  tittel: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

const cssPrefix = "ikonpanel";

const IkonPanel = ({ ikon, tittel, children, className }: Props) => {
  return (
    <PanelBase className={`${cssPrefix}${className ? ` ${className}` : ""}`}>
      {ikon && (
        <div className={`${cssPrefix}__ikon-container`}>
          <img src={ikon} alt="" className={`${cssPrefix}__ikon`} />
        </div>
      )}
      <div className={`${cssPrefix}__innhold`}>
        <Systemtittel className={`${cssPrefix}__innhold-header`}>
          {tittel}
        </Systemtittel>
        <div className={`${cssPrefix}__innhold-body`}>{children}</div>
      </div>
    </PanelBase>
  );
};

export default IkonPanel;
