import { LenkeData, TextBlock } from "../serializers";

export type ChannelProps = {
  type: string
  answer_time?: string,
  closed?: boolean,
  description?: TextBlock[],
  themes?: Theme[]
}

export type Channels = {
  telephone: ChannelProps,
  chat: ChannelProps,
  tutor: ChannelProps,
  write: ChannelProps
}

type Theme = {
  title: string,
  link: LenkeData
}