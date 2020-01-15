import React from "react";
import { LenkepanelData } from "../../types/lenker";
import { urls } from "Config";
import { FormattedMessage } from "react-intl";

const chatTemaLenker: Array<LenkepanelData> = [
  {
    grafanaId: "chat.jobbsoker",
    tittelId: "chat.jobbsoker.tittel",
    ingress: <FormattedMessage id={"chat.jobbsoker.ingressKort"} />,
    url: urls.chat.jobbsoker.temaside
  },
  {
    grafanaId: "chat.familie",
    tittelId: "chat.familie.tittel",
    ingress: <FormattedMessage id={"chat.familie.ingressKort"} />,
    url: urls.chat.familie.temaside
  },
  {
    grafanaId: "chat.sosialhjelp",
    tittelId: "chat.sosialhjelp.tittel",
    ingress: <FormattedMessage id={"chat.sosialhjelp.ingressKort"} />,
    url: urls.chat.sosialhjelp.temaside
  },
  {
    grafanaId: "chat.okonomi",
    tittelId: "chat.okonomi.tittel",
    ingress: <FormattedMessage id={"chat.okonomi.ingressKort"} />,
    url: urls.chat.okonomi.temaside
  },
  {
    grafanaId: "chat.eures",
    tittelId: "chat.eures.tittel",
    ingress: <FormattedMessage id={"chat.eures.ingressKort"} />,
    url: urls.chat.eures.temaside
  }
];

export default chatTemaLenker;
