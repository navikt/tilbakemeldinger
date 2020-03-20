import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../utils/sanity/serializers";

type Props = {
  blocks: any
};

export const SanityBlocks = ({ blocks }: Props) => (blocks
    ? <BlockContent blocks={blocks} serializers={serializers} />
    : null
);
