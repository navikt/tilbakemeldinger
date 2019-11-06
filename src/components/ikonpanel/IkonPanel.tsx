import React from "react";

import { Systemtittel } from "nav-frontend-typografi";
import { Panel } from "nav-frontend-paneler";

type Props = {
  ikon?: string;
  tittel: React.ReactNode;
  children: React.ReactNode;
};

const cssPrefix = "ikonpanel";

const IkonPanel = ({ikon, tittel, children}: Props) => {
  return (
    <Panel className={`${cssPrefix}`}>
      {ikon && <img src={ikon} alt="" className={`${cssPrefix}__ikon`}/>}
      <div className={`${cssPrefix}__innhold`}>
        <Systemtittel className={`${cssPrefix}__header`}>
          {tittel}
        </Systemtittel>
        <div className={`${cssPrefix}__body`}>
          {children}
        </div>
      </div>
    </Panel>
  );
};

export default IkonPanel;
