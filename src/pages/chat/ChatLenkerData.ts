import { urls } from "Config";
import { ChatTema } from "../../types/chat";
import { TemaLenkepanelData } from "../../types/lenker";

export const chatTemaLenkepaneler: TemaLenkepanelData[] = [
  {
    tema: ChatTema.Jobbsoker,
    grafanaId: "chat.jobbsoker",
    tittelFallbackId: "chat.jobbsoker.tittel",
    url: urls.chat.jobbsoker.temaside
  },
  {
    tema: ChatTema.Arbeidsgiver,
    grafanaId: "chat.arbeidsgiver",
    tittelFallbackId: "chat.arbeidsgiver.tittel",
    url: urls.chat.arbeidsgiver.temaside
  },
  {
    tema: ChatTema.Syk,
    grafanaId: "chat.syk",
    tittelFallbackId: "chat.syk.tittel",
    url: urls.chat.syk.temaside
  },
  {
    tema: ChatTema.Familie,
    grafanaId: "chat.familie",
    tittelFallbackId: "chat.familie.tittel",
    url: urls.chat.familie.temaside
  },
  {
    tema: ChatTema.Ufor,
    grafanaId: "chat.ufor",
    tittelFallbackId: "chat.ufor.tittel",
    url: urls.chat.ufor.temaside
  },
  {
    tema: ChatTema.Sosial,
    grafanaId: "chat.sosialhjelp",
    tittelFallbackId: "chat.sosialhjelp.tittel",
    url: urls.chat.sosialhjelp.temaside
  },
  {
    tema: ChatTema.Okonomi,
    grafanaId: "chat.okonomi",
    tittelFallbackId: "chat.okonomi.tittel",
    url: urls.chat.okonomi.temaside
  },
  {
    tema: ChatTema.EURES,
    grafanaId: "chat.eures",
    tittelFallbackId: "chat.eures.tittel",
    url: urls.chat.eures.temaside
  }
];
