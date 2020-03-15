import { LenkeData, LocaleString, TextBlock } from "../serializers";
import { ChatTema } from "../../../types/chat";

export type ChannelProps = {
  type: string
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

export enum ThemeId {
  Jobbsoker = "chat_arbeid",
  EURES = "chat_eures",
  Familie = "chat_familie",
  Okonomi = "chat_okonomi",
  Sosial = "chat_sosial",
  Syk = "chat_syk",
  Ufor = "chat_ufor"
}

export const sanityIdToChatbotId = {
  [ThemeId.Jobbsoker]: [ChatTema.Jobbsoker],
  [ThemeId.EURES]: [ChatTema.EURES],
  [ThemeId.Familie]: [ChatTema.Familie],
  [ThemeId.Okonomi]: [ChatTema.Okonomi],
  [ThemeId.Sosial]: [ChatTema.Sosial],
  [ThemeId.Syk]: [ChatTema.Syk],
  [ThemeId.Ufor]: [ChatTema.Ufor],
};

type Theme = {
  link: LenkeData
  theme_id: string
}
