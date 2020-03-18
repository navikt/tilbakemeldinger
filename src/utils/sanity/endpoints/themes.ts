import { LenkePanel, Page } from "../serializers";
import { ChatTema } from "../../../types/chat";
import { STOTema } from "../../../types/skrivtiloss";

export type ThemeProps = {
  _id?: string;
  closed?: boolean;
  link?: LenkePanel;
  page?: Page;
};

export type Themes = {
  isLoaded: boolean;
  props: ThemeList;
};

export type ThemeList = { [key in ChatTema | STOTema]: ThemeProps };

export const temaToSanityId = {
  [ChatTema.Arbeidsgiver]: "chat-med-oss-arbeidsgiver",
  [ChatTema.EURES]: "chat-med-oss-eures",
  [ChatTema.Familie]: "chat-med-oss-familie",
  [ChatTema.Jobbsoker]: "chat-med-oss-jobbsoker",
  [ChatTema.Okonomi]: "chat-med-oss-okonomi",
  [ChatTema.Sosial]: "chat-med-oss-sosialhjelp",
  [ChatTema.Syk]: "chat-med-oss-syk",
  [ChatTema.Ufor]: "chat-med-oss-ufor",
  [STOTema.Familie]: "skriv-til-oss-familie",
  [STOTema.Jobbsoker]: "skriv-til-oss-jobbsoker",
  [STOTema.Pensjon]: "skriv-til-oss-pensjonist",
  [STOTema.Syk]: "skriv-til-oss-syk",
  [STOTema.Ufor]: "skriv-til-oss-ufor",
  [STOTema.Hjelpemidler]: "skriv-til-oss-hjelpemidler",
  [STOTema.HjelpemidlerGenerelt]: "skriv-til-oss-hjelpemidler-generelt",
  [STOTema.HjelpemidlerOrtopedisk]: "skriv-til-oss-hjelpemidler-ortopedisk",
  [STOTema.HjelpemidlerBil]: "skriv-til-oss-hjelpemidler-bil"
};

const initialProps = Object.keys(temaToSanityId).reduce((acc, tema) =>
  ({ ...acc, [tema]: {} }), {});

export const initialThemes = {
  isLoaded: false,
  props: initialProps
};

export const createCompleteThemeList = (themeProps: ThemeProps[]) =>
  Object.entries(temaToSanityId).reduce((acc, [kanalId, sanityId]) =>
    ({...acc, [kanalId]: themeProps.find(cp => cp._id === sanityId) || {}}), {});
