import { ChatTema } from "../../../types/kanaler";

type ChatTemasideData = {
  [key in ChatTema]: {
    tittelId: string,
    grafanaId: string,
    harChatbot: boolean,
  }
};

export const chatTemaSideData: ChatTemasideData = {
  [ChatTema.Jobbsoker]: {
    tittelId: "chat.jobbsoker.tittel",
    grafanaId: "chat.start.jobbsoker",
    harChatbot: true
  },
  [ChatTema.Arbeidsgiver]: {
    tittelId: "chat.arbeidsgiver.tittel",
    grafanaId: "chat.start.arbeidsgiver",
    harChatbot: true
  },
  [ChatTema.Familie]: {
    tittelId: "chat.familie.tittel",
    grafanaId: "chat.start.familie",
    harChatbot: true
  },
  [ChatTema.Ufor]: {
    tittelId: "chat.ufor.tittel",
    grafanaId: "chat.start.ufor",
    harChatbot: false
  },
  [ChatTema.Syk]: {
    tittelId: "chat.syk.tittel",
    grafanaId: "chat.start.syk",
    harChatbot: true
  },
  [ChatTema.Sosial]: {
    tittelId: "chat.sosialhjelp.tittel",
    grafanaId: "chat.start.sosial",
    harChatbot: true
  },
  [ChatTema.Okonomi]: {
    tittelId: "chat.okonomi.tittel",
    grafanaId: "chat.start.okonomi",
    harChatbot: false
  },
  [ChatTema.EURES]: {
    tittelId: "chat.eures.tittel",
    grafanaId: "chat.start.eures",
    harChatbot: false
  }
};
