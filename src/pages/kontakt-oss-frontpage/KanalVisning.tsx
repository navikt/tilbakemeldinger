import { Normaltekst, Element } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import BlockContent from "@sanity/block-content-to-react";
import { Language, serializers } from "../../utils/sanity/serializers";
import React from "react";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";

type Props = {
  kanal: Kanal;
  children: JSX.Element;
};

const StengtMelding = () => (
  <div className={"kanal-stengt"}>
    <Element><FormattedMessage id={"kontaktoss.kanal.stengt"} /></Element>
  </div>
);

export const KanalVisning = ({ kanal, children }: Props) => {
  const [{ channels }] = useStore();

  if (channels.isLoaded) {
    return <NavContentLoader lines={3} />;
  }

  const channelProps = channels.props[kanal];

  const { answer_time, closed, description } = channelProps;
  const svartid = answer_time && answer_time[Language.Bokmaal];

  return (
    <>
      <div>
        {svartid && !closed && (
          <Normaltekst className="svartid">
            <FormattedMessage id={"kontaktoss.svartid"} />
            {svartid}
          </Normaltekst>
        )}
        {description && <BlockContent blocks={description} serializers={serializers} />}
      </div>
      {closed ? <StengtMelding /> : children}
    </>
  );
};
