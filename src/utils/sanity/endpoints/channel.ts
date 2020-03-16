import { LenkeData, LocaleString, TextBlock } from "../serializers";
import { ChatTema } from "../../../types/chat";

export type ChannelProps = {
  _id: string;
  answer_time?: LocaleString;
  closed?: boolean;
  description?: TextBlock[];
  themes?: Theme[];
}

export type Channels = {
  isLoaded: boolean;
  types: {
    telephone: ChannelProps;
    chat: ChannelProps;
    tutor: ChannelProps;
    write: ChannelProps;
  }
}

type Theme = {
  _key: string;
  closed: boolean;
  link: LenkeData;
}

export const chatbotIdToSanityId = {
  [ChatTema.Jobbsoker]: "jobbsoker",
  [ChatTema.EURES]: "eures",
  [ChatTema.Familie]: "familie",
  [ChatTema.Okonomi]: "okonomi",
  [ChatTema.Sosial]: "sosialhjelp",
  [ChatTema.Syk]: "syk",
  [ChatTema.Ufor]: "ufor",
};