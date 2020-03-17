import { LocaleString, TextBlock } from "../serializers";

export type ChannelProps = {
  _id?: string;
  error?: boolean;
  answer_time?: LocaleString;
  closed?: boolean;
  description?: TextBlock[];
};

export type Channels = {
  isLoaded: boolean;
  props: ChannelList;
};

export type ChannelList = {
  ringOss: ChannelProps;
  skrivTilOss: ChannelProps;
  chat: ChannelProps;
  kontaktVeileder: ChannelProps;
};

export const kanalToSanityId = {
  ringOss: "ring-oss",
  skrivTilOss: "skriv-til-oss",
  chat: "chat-med-oss",
  kontaktVeileder: "kontakt-din-veileder",
};

const initialProps = Object.keys(kanalToSanityId).reduce((acc, kanal) =>
  ({ ...acc, [kanal]: {} }), {});

export const initialChannels = {
  isLoaded: false,
  props: initialProps
};

export const createCompleteChannelList = (channelProps: ChannelProps[]) =>
  Object.entries(kanalToSanityId).reduce((acc, [kanalId, sanityId]) =>
    ({...acc, [kanalId]: channelProps.find(cp => cp._id === sanityId) || {}}), {});
