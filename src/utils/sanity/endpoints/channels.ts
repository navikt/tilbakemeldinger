import { LocaleString, TextBlock } from "../serializers";
import { Kanal } from "../../../types/kanaler";

export type ChannelProps = {
  _id?: string;
  answer_time?: LocaleString;
  closed?: boolean;
  description?: TextBlock[];
  preamble?: TextBlock[];
};

export type Channels = {
  isLoaded: boolean;
  props: ChannelList;
};

export type ChannelList = { [key in Kanal]: ChannelProps };

export const forsideSanityId = "forsiden";

export const kanalToSanityId = {
  [Kanal.RingOss]: "ring-oss",
  [Kanal.SkrivTilOss]: "skriv-til-oss",
  [Kanal.Chat]: "chat-med-oss",
  [Kanal.KontaktVeileder]: "kontakt-din-veileder",
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
