import { TextBlock } from "../serializers";

export type ChannelProps = {
  type: string
  answer_time?: string,
  closed?: boolean,
  description?: TextBlock[]
}

export type Channels = {
  telephone: ChannelProps,
  chat: ChannelProps,
  tutor: ChannelProps,
  write: ChannelProps
}
