
export type ChatTemaData = {
  tittelId: string,
  kortTekstId: string,
  langTekstIds: Array<string>,
  temaKode: ChatTema,
};

export enum ChatTema {
  Familie = "familie",
  AAP = "aap",
  Sosial = "sosial",
  Okonomi = "okonomi",
  EURES = "eures",
}
