import { LenkeData, LocaleString, TextBlock } from "../serializers";
import { ChatTema } from "../../../types/chat";

export type ChannelProps = {
  type: string,
  answer_time?: LocaleString,
  closed?: boolean,
  description?: TextBlock[],
  themes?: Theme[]
}

export type Channels = {
  isLoaded: boolean;
  types: {
    telephone: ChannelProps,
    chat: ChannelProps,
    tutor: ChannelProps,
    write: ChannelProps
  }
}

export const chatbotIdToSanityId = {
  [ChatTema.Jobbsoker]: "chat_arbeid",
  [ChatTema.EURES]: "chat_eures",
  [ChatTema.Familie]: "chat_familie",
  [ChatTema.Okonomi]: "chat_okonomi",
  [ChatTema.Sosial]: "chat_sosial",
  [ChatTema.Syk]: "chat_syk",
  [ChatTema.Ufor]: "chat_ufor",
};

type Theme = {
  link: LenkeData,
  theme_id: string,
  closed: boolean
}
