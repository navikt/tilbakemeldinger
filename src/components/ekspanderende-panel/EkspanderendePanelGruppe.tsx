import React, { useState } from "react";
import EkspanderendePanel, { EkspanderendePanelData } from "./EkspanderendePanel";

type Props = {
  panelData: Array<EkspanderendePanelData>,
  groupName: string,
  defaultCheckedId?: string,
};

const EkspanderendePanelGruppe = ({panelData, groupName, defaultCheckedId}: Props) => {
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
