import { urls } from "Config";
import { ChatTema, TemaLenke } from "../../../types/kanaler";

export const chatTemaLenker: TemaLenke[] = [
  {
    tema: ChatTema.Jobbsoker,
    grafanaId: "chat.jobbsoker",
    fallbackTittelId: "chat.jobbsoker.tittel",
    url: urls.chat.jobbsoker.temaside
  },
  {
    tema: ChatTema.Arbeidsgiver,
    grafanaId: "chat.arbeidsgiver",
    fallbackTittelId: "chat.arbeidsgiver.tittel",
    url: urls.chat.arbeidsgiver.temaside
  },
  {
    tema: ChatTema.Syk,
    grafanaId: "chat.syk",
    fallbackTittelId: "chat.syk.tittel",
    url: urls.chat.syk.temaside
  },
  {
    tema: ChatTema.Familie,
    grafanaId: "chat.familie",
    fallbackTittelId: "chat.familie.tittel",
    url: urls.chat.familie.temaside
  },
  {
    tema: ChatTema.Ufor,
    grafanaId: "chat.ufor",
    fallbackTittelId: "chat.ufor.tittel",
    url: urls.chat.ufor.temaside
  },
  {
    tema: ChatTema.Sosial,
    grafanaId: "chat.sosialhjelp",
    fallbackTittelId: "chat.sosialhjelp.tittel",
    url: urls.chat.sosialhjelp.temaside
  },
  {
    tema: ChatTema.Okonomi,
    grafanaId: "chat.okonomi",
    fallbackTittelId: "chat.okonomi.tittel",
    url: urls.chat.okonomi.temaside
  },
  {
    tema: ChatTema.EURES,
    grafanaId: "chat.eures",
    fallbackTittelId: "chat.eures.tittel",
    url: urls.chat.eures.temaside
  }
];
