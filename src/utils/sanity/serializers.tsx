import {
  Element,
  Ingress,
  Innholdstittel,
  Normaltekst,
  Sidetittel,
  Systemtittel,
  Undertittel
} from "nav-frontend-typografi";
import { alertSerializer } from "./endpoints/alert";
import React from "react";

export enum TypoStyle {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Normal = "normal",
}

const typoComponents = {
  [TypoStyle.H1]: Sidetittel,
  [TypoStyle.H2]: Innholdstittel,
  [TypoStyle.H3]: Systemtittel,
  [TypoStyle.H4]: Undertittel,
  [TypoStyle.H5]: Ingress,
  [TypoStyle.H6]: Element,
  [TypoStyle.Normal]: Normaltekst
};

export type TextBlock = {
  style: TypoStyle,
  children: TextWithMarks[]
}

// TODO: oppdater med marks
export type TextWithMarks = {
  marks: string[],
  text: string
}

type BlockProps = {
  node: TextBlock,
}

const blockSerializer = (block: BlockProps) => {
  const TypoComponent = typoComponents[block.node.style];

  return (
    <TypoComponent>
      {block.node.children.reduce((acc, textWithMarks) => acc+textWithMarks.text, "")}
    </TypoComponent>
  )
};

export const serializers = {
  types: {
    alert: alertSerializer,
    block: blockSerializer
  }
};


