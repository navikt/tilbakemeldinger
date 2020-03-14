import { LenkeData, LocaleString, TextBlock } from "../serializers";

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

type Theme = {
  title: string,
  link: LenkeData
}