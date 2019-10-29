import React, { ReactNode, useState } from "react";
import EkspanderendePanel from "./EkspanderendePanel";

export type EkspanderendePanelData = {
  tittel: string,
  kollapsetInnhold: ReactNode,
  ekspandertInnhold: ReactNode,
  id?: string,
  kollapsetIkon?: ReactNode,
  ekspandertIkon?: ReactNode,
};

const EkspanderendePanelGruppe = (panelData: Array<EkspanderendePanelData>, groupName: string, defaultCheckedId?: string) => {
  const [selectedId, setSelectedId] = useState(defaultCheckedId);
  const optionChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(event.currentTarget.value);
  };

  return(
    <>
      {
        panelData.map((panel, index) => {
          const id: string = panel.id || index.toString();
          return (
            <EkspanderendePanel
              checked={selectedId === id}
              optionValue={id}
              groupName={groupName}
              checkedCallback={optionChangeHandler}
              panelData={panel}
              key={id}
            />
          );
        })
      }
    </>
  );
};

export default EkspanderendePanelGruppe;
