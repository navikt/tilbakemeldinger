import ApningsTider from "../utils/apningstider";

export enum ChatTema {
  Arbeidsgiver = "arbeidsgiver",
  Jobbsoker = "jobbsoker",
  Syk = "syk",
  Familie = "familie",
  Ufor = "ufør",
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
