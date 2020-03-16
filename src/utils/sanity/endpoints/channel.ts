import { LenkeData, LocaleString, TextBlock } from "../serializers";
import { ChatTema } from "../../../types/chat";
import { Kanal } from "../../../types/kanaler";

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
  veileder: "tutor",
};

export type ChannelProps = {
  _id: string;
  error?: boolean;
  answer_time?: LocaleString;
  closed?: boolean;
  description?: TextBlock[];
  themes?: ChannelTheme[];
};

export type ChannelList = {[id: string]: ChannelProps};

export type Channels = {
  isLoaded: boolean;
  types: ChannelList;
};

export type ChannelTheme = {
  _key: string;
  closed: boolean;
  link: LenkeData;
};

const channelNotFound: ChannelProps = {
  _id: "",
  error: true
};

export const createValidChannelList = (channelProps: ChannelProps[]): ChannelList =>
  Object.values(kanalToSanityId).reduce((acc, id) =>
    ({...acc, [id]: channelProps.find(cp => cp._id === id) || channelNotFound}), {});
