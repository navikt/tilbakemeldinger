import { AlertStripeType } from "nav-frontend-alertstriper";
import React from "react";
import { LocaleBlock, LocaleString } from "../../utils/sanity/serializers";
import { SanityBlocks } from "../sanity-blocks/SanityBlocks";
import { Varsel } from "./Varsel";

type Props = {
  localeBlock: LocaleBlock | LocaleString;
  type: AlertStripeType;
};

export const SanityVarsel = ({ localeBlock, type }: Props) => (
  <Varsel type={type}>
    <SanityBlocks blocks={localeBlock} />
  </Varsel>
);
