import React from "react";
import { LenkepanelData } from "../../types/lenker";
import { urls } from "Config";
import { FormattedMessage } from "react-intl";
import { ChatTemaData } from "../../types/chat";

const chatTemaLenker: Array<LenkepanelData> = [
  {
    tittelId: "chat.jobbsoker.tittel",
    ingress: <FormattedMessage id={"chat.jobbsoker.ingressKort"} />,
    url: urls.chat.jobbsoker.temaside
  },
  {
    tittelId: "chat.aap.tittel",
    ingress: <FormattedMessage id={"chat.aap.ingressKort"} />,
    url: urls.chat.aap.temaside
  },
  {
    tittelId: "chat.familie.tittel",
    ingress: <FormattedMessage id={"chat.familie.ingressKort"} />,
    url: urls.chat.familie.temaside
  },
  {
    tittelId: "chat.sosialhjelp.tittel",
    ingress: <FormattedMessage id={"chat.sosialhjelp.ingressKort"} />,
    url: urls.chat.sosialhjelp.temaside
  },
  {
    tittelId: "chat.okonomi.tittel",
    ingress: <FormattedMessage id={"chat.okonomi.ingressKort"} />,
    url: urls.chat.okonomi.temaside
  },
  {
    tittelId: "chat.eures.tittel",
    ingress: <FormattedMessage id={"chat.eures.ingressKort"} />,
    url: urls.chat.eures.temaside
  },
];

export default chatTemaLenker;
