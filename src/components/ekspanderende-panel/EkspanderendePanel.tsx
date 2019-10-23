import React, { ReactNode } from "react";
import PanelBase from "nav-frontend-paneler";
import { EkspanderendePanelData } from "./EkspanderendePanelGruppe";
import { Undertittel } from "nav-frontend-typografi";

const cssPrefix = "ekspanderende-panel";

type Props = {
  checked: boolean,
  optionValue: string,
  groupName: string,
  checkedCallback: React.FormEventHandler;
  panelData: EkspanderendePanelData,
};

const checkedIndicator = (isChecked: boolean, iconChecked?: ReactNode, iconUnChecked?: ReactNode) => {
  const checked = iconChecked || "✔";
  const unChecked = iconUnChecked || "✘";

  return(isChecked ? checked : unChecked);
};

const EkspanderendePanel = (
  {checked, optionValue, groupName, checkedCallback, panelData}: Props) => {
  return(
    <div className={cssPrefix}>
      <label>
        <input
          type="radio"
          name={groupName}
          value={optionValue}
          checked={checked}
          onChange={checkedCallback}
          className={`${cssPrefix}__input`}
        />
        <PanelBase
          border={true}
          className={`${cssPrefix}__panel`}
        >
          <div className={`${cssPrefix}__header`}>
            <span className={`${cssPrefix}__indicator`}>
              {checkedIndicator(checked, panelData.ekspandertIkon, panelData.kollapsetIkon)}
            </span>
            <Undertittel className={`${cssPrefix}__tittel`}>
              {panelData.tittel}
            </Undertittel>
          </div>
          <div className={`${cssPrefix}__innhold`}>
            {checked ? panelData.ekspandertInnhold : panelData.kollapsetInnhold}
          </div>
        </PanelBase>
      </label>
    </div>
  );
};

export default EkspanderendePanel;
