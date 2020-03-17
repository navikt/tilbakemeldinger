import ApningsTider from "../utils/apningstider";

// OBS: denne og STOTema må ikke ha overlappende verdier!
export enum ChatTema {
  Arbeidsgiver = "chat-arbeidsgiver",
  Jobbsoker = "chat-jobbsoker",
  Syk = "chat-syk",
  Familie = "chat-familie",
  Ufor = "chat-ufør",
  Sosial = "chat-sosial",
  Okonomi = "chat-okonomi",
  EURES = "chat-eures",
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
