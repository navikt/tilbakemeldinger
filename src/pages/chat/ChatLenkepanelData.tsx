import React from "react";
import { LenkepanelData } from "../../types/lenker";
import { urls } from "Config";
import { FormattedMessage } from "react-intl";

const chatTemaLenker: Array<LenkepanelData> = [
  {
    grafanaId: "chat.arbeidsgiver",
    tittelId: "chat.arbeidsgiver.tittel",
    ingress: <FormattedMessage id={"chat.arbeidsgiver.ingressKort"} />,
    url: urls.chat.arbeidsgiver.temaside
  },
  {
    grafanaId: "chat.jobbsoker",
    tittelId: "chat.jobbsoker.tittel",
    ingress: <FormattedMessage id={"chat.jobbsoker.ingressKort"} />,
    url: urls.chat.jobbsoker.temaside
  },
  {
    grafanaId: "chat.syk",
    tittelId: "chat.syk.tittel",
    ingress: <FormattedMessage id={"chat.syk.ingressKort"} />,
    url: urls.chat.syk.temaside
  },
  {
    grafanaId: "chat.familie",
    tittelId: "chat.familie.tittel",
    ingress: <FormattedMessage id={"chat.familie.ingressKort"} />,
    url: urls.chat.familie.temaside
  },
  {
    grafanaId: "chat.ufor",
    tittelId: "chat.ufor.tittel",
    ingress: <FormattedMessage id={"chat.ufor.ingressKort"} />,
    url: urls.chat.ufor.temaside
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
