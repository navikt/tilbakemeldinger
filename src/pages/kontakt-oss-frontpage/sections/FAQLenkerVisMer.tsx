import React from "react";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { FormattedMessage } from "react-intl";

interface Props {
  visFlere: boolean;
  onClick: () => void;
}
const VisMer = (props: Props) => {
  return (
    <button onClick={props.onClick} className={"faq__vismer lenke"}>
      {props.visFlere ? (
        <div className={"faq__vismer-content"}>
          <FormattedMessage id="faq.visfaerre" />
          <OppChevron />
        </div>
      ) : (
        <div className={"faq__vismer-content"}>
          <FormattedMessage id="faq.visflere" />
          <NedChevron />
        </div>
      )}
    </button>
  );
};

export default VisMer;
