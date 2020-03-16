import React from "react";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { LocaleBlock, serializers } from "../serializers";
import BlockContent from "@sanity/block-content-to-react";

export type Alert = {
  type: AlertStripeType,
  description: LocaleBlock[]
};

export const alertSerializer = (props: any) => {
  const alert = props.node as Alert;
  return (
    <AlertStripe className={"varsel-panel"} type={alert.type}>
      <BlockContent blocks={alert.description} serializers={serializers}/>
    </AlertStripe>
  )
};
