import { Normaltekst, Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../../utils/sanity/serializers";
import React from "react";
import { ChannelProps } from "../../../utils/sanity/endpoints/channel";

type Props = {
  channelProps: ChannelProps,
  children: JSX.Element
}

const StengtMelding = () => (
  <div className={'kanal-stengt'}>
    <Element>{"Tjenesten er dessverre stengt, prøv igjen senere."}</Element>
  </div>
);

export const KanalVisning = ({channelProps: {answer_time, closed, description}, children}: Props) => {
  return (
    <>
      <div>
        {answer_time && !closed && (
          <Normaltekst className="svartid">
            <FormattedMessage id={"kontaktoss.svartid"}/>
            {answer_time}
          </Normaltekst>
        )}
        {description && <BlockContent blocks={description} serializers={serializers}/>}
      </div>
      {closed ? <StengtMelding/> : children}
    </>
)};
