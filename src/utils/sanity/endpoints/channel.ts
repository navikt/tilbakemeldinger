import { LenkeData, LocaleString, TextBlock } from "../serializers";
import { ChatTema } from "../../../types/chat";

export type ChannelProps = {
  _id: string;
  error?: boolean;
  answer_time?: LocaleString;
  closed?: boolean;
  description?: TextBlock[];
  themes?: Theme[];
};

export enum ChannelType {
  Telefon = "telephone",
  Chat = "chat",
  Veileder = "tutor",
  SkrivTilOss = "write"
}

export type ChannelTypeList = {[id in ChannelType]: ChannelProps};

export type Channels = {
  isLoaded: boolean;
  types: ChannelTypeList;
};

type Theme = {
  _key: string;
  closed: boolean;
  link: LenkeData;
};

export const channelError = {
  _id: "",
  error: true
};

export const chatbotIdToSanityId = {
  [ChatTema.Arbeidsgiver]: "arbeidsgiver",
  [ChatTema.Jobbsoker]: "jobbsoker",
  [ChatTema.EURES]: "eures",
  [ChatTema.Familie]: "familie",
  [ChatTema.Okonomi]: "okonomi",
  [ChatTema.Sosial]: "sosialhjelp",
  [ChatTema.Syk]: "syk",
  [ChatTema.Ufor]: "ufor",
};
