import { Normaltekst } from "nav-frontend-typografi";
import { FormattedMessage } from "react-intl";
import BlockContent from "@sanity/block-content-to-react";
import { Language, serializers } from "../../utils/sanity/serializers";
import React from "react";
import NavFrontendSpinner from "nav-frontend-spinner";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { TjenesteStengtMelding } from "../../components/varsler/tjeneste-stengt/TjenesteStengtMelding";

type Props = {
  kanal: Kanal;
  visHvisStengt?: boolean;
  children: JSX.Element;
};

export const KanalVisning = ({ kanal, visHvisStengt, children }: Props) => {
  const [{ channels }] = useStore();

  if (!channels.isLoaded) {
    return <NavFrontendSpinner />;
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
      {closed && !visHvisStengt ? <TjenesteStengtMelding /> : children}
    </>
  );
};
