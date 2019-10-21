import React from "react";
import { NedChevron, OppChevron } from "nav-frontend-chevron";

interface Props {
  visFlere: boolean;
  onClick: () => void;
}
const VisMer = (props: Props) => {
  return (
    <button onClick={props.onClick} className={"faq__vismer lenke"}>
      {props.visFlere ? (
        <div className={"faq__vismer-content"}>
          Vis færre
          <OppChevron />
        </div>
      ) : (
        <div className={"faq__vismer-content"}>
          Vis flere
          <NedChevron />
        </div>
      )}
    </button>
  );
};

export default VisMer;
