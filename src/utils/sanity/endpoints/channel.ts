import { LenkeData, LocaleString, TextBlock } from "../serializers";
import { ChatTema } from "../../../types/chat";

export const chatTemaToSanityId = {
  [ChatTema.Arbeidsgiver]: "arbeidsgiver",
  [ChatTema.Jobbsoker]: "jobbsoker",
  [ChatTema.EURES]: "eures",
  [ChatTema.Familie]: "familie",
  [ChatTema.Okonomi]: "okonomi",
  [ChatTema.Sosial]: "sosialhjelp",
  [ChatTema.Syk]: "syk",
  [ChatTema.Ufor]: "ufor",
};

export const kanalToSanityId = {
  ringOss: "telephone",
  skrivTilOss: "write",
  chat: "chat",
  kontaktVeileder: "tutor",
};

export type ChannelList = {
  ringOss: ChannelProps;
  skrivTilOss: ChannelProps;
  chat: ChannelProps;
  kontaktVeileder: ChannelProps;
};

export type ChannelProps = {
  _id?: string;
  error?: boolean;
  answer_time?: LocaleString;
  closed?: boolean;
  description?: TextBlock[];
  themes?: ChannelTheme[];
};

export type Channels = {
  isLoaded: boolean;
  types: ChannelList;
};

export type ChannelTheme = {
  _key: string;
  closed: boolean;
  link: LenkeData;
};

export const createCompleteChannelList = (channelProps: ChannelProps[]) =>
  Object.entries(kanalToSanityId).reduce((acc, [kanalId, sanityId]) =>
    ({...acc, [kanalId]: channelProps.find(cp => cp._id === sanityId) || {}}), {});
