import ApningsTider from "../utils/apningstider";

export enum ChatTema {
  Familie = "familie",
  Syk = "syk",
  Jobbsoker = "jobbsoker",
  Sosial = "sosial",
  Okonomi = "okonomi",
  EURES = "eures",
}

export type ChatTemaData = {
  tittelTekstId: string,
  chatTema: ChatTema,
  apningstider?: ApningsTider,
  harChatbot?: boolean
};

export type ChatConfig = {
  configId: string,
  queueKey: string,
};
