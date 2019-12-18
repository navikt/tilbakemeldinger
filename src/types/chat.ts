import ApningsTider from "../utils/apningstider";

export enum ChatTema {
  Familie = "familie",
  AAP = "aap",
  Jobbsoker = "jobbsoker",
  Sosial = "sosial",
  Okonomi = "okonomi",
  EURES = "eures",
}

export type ChatTemaData = {
  tittelTekstId: string,
  chatTema: ChatTema,
  apningstider?: ApningsTider,
};

export type ChatConfig = {
  configId: string,
  queueKey: string,
};
