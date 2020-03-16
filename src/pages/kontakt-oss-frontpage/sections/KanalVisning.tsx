import { Normaltekst, Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import BlockContent from "@sanity/block-content-to-react";
import { Language, serializers } from "../../../utils/sanity/serializers";
import React from "react";
import { ChannelProps } from "../../../utils/sanity/endpoints/channel";
import NavFrontendSpinner from "nav-frontend-spinner";
import { useStore } from "../../../providers/Provider";

type Props = {
  channelProps: ChannelProps,
  isLoaded?: boolean,
  children: JSX.Element
}

const StengtMelding = () => (
  <div className={'kanal-stengt'}>
    <Element>{"Tjenesten er dessverre stengt, prøv igjen senere."}</Element>
  </div>
);

export const KanalVisning = ({channelProps, isLoaded = true, children}: Props) => {
  const [{visTekniskFeilMelding}, dispatch] = useStore();

  if (!isLoaded) {
    return <NavFrontendSpinner/>
  }

  if (channelProps.error) {
    !visTekniskFeilMelding && dispatch({type: "SETT_TEKNISK_FEILMELDING"});
  }

  const {answer_time, closed, description} = channelProps;
  const svartid = answer_time && answer_time[Language.Bokmaal];

  return (
    <>
      <div>
        {svartid && !closed && (
          <Normaltekst className="svartid">
            <FormattedMessage id={"kontaktoss.svartid"}/>
            {svartid}
          </Normaltekst>
        )}
        {description && <BlockContent blocks={description} serializers={serializers}/>}
      </div>
      {closed ? <StengtMelding/> : children}
    </>
  )
};
