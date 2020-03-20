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
import BlockContent from "@sanity/block-content-to-react";

export enum Language {
  Bokmaal = "nb"
}

enum TypoStyle {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  Normal = "normal",
}

const language = Language.Bokmaal;

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
  node: {style: TypoStyle};
  children: React.ReactElement[];
};

export type LocaleBlock = { [key in Language]: TextBlock };

export type LocaleString = { [key in Language]: string };

export type LocaleLink = { [key in Language]: string };

export type Page = {
  content: LocaleBlock;
  title: LocaleString;
};

export type LenkePanel = {
  description: LocaleBlock;
  title: LocaleString;
};

const localeStringSerializer = (block: { node: LocaleString }) => {
  return block.node[language];
};

const localeBlockSerializer = (block: { node: LocaleBlock }) => {
  const blocks = block.node[language];
  return blocks ? <BlockContent blocks={block.node[language]} serializers={serializers} /> : null;
};

const blockSerializer = (block: TextBlock) => {
  const TypoComponent = typoComponents[block.node.style] || typoComponents[TypoStyle.Normal];
  return (
    <TypoComponent>
      {block.children}
    </TypoComponent>
  );
};

export const serializers = {
  types: {
    alert: alertSerializer,
    localeBlock: localeBlockSerializer,
    localeString: localeStringSerializer,
    block: blockSerializer,
  }
};
