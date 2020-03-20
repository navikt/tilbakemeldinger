import React from "react";
import AlertStripe, { AlertStripeType } from "nav-frontend-alertstriper";
import { LocaleBlock } from "../serializers";
import { SanityBlocks } from "../../../components/sanity-blocks/SanityBlocks";

export type Alert = {
  type: AlertStripeType;
  description: LocaleBlock[];
  displayOnAllPages: boolean;
  displayOnSpesificPages: string[];
};

export type Alerts = {
  isLoaded: boolean;
  alerts: Alert[];
};

export const initialAlerts = {
  isLoaded: false,
  alerts: []
};

export const alertSerializer = (props: any) => {
  const alert = props.node as Alert;
  return (
    <AlertStripe className={"varsel-panel"} type={alert.type}>
      <SanityBlocks blocks={alert.description} />
    </AlertStripe>
  );
};
