import { ChatTemaData, ChatTema } from "../../types/chat";

const personvernTekstId = "chat.advarsel.personvern";

const chatSideInnhold: Array<ChatTemaData> = [
  {
    tittelId: "chat.familie.tittel",
    kortTekstId: "chat.familie.ingressKort",
    langTekstIds: ["chat.familie.ingressKort", "chat.familie.ingress", personvernTekstId],
    temaKode: ChatTema.Familie
  },
  {
    tittelId: "chat.jobbsoker.tittel",
    kortTekstId: "chat.jobbsoker.ingressKort",
    langTekstIds: ["chat.jobbsoker.ingressKort", "chat.jobbsoker.ingress", personvernTekstId],
    temaKode: ChatTema.Jobbsoker
  },
  {
    tittelId: "chat.aap.tittel",
    kortTekstId: "chat.aap.ingressKort",
    langTekstIds: ["chat.aap.ingressKort", "chat.aap.ingress", personvernTekstId],
    temaKode: ChatTema.AAP
  },
  {
    tittelId: "chat.sosialhjelp.tittel",
    kortTekstId: "chat.sosialhjelp.ingressKort",
    langTekstIds: ["chat.sosialhjelp.ingressKort", "chat.sosialhjelp.ingress", personvernTekstId],
    temaKode: ChatTema.Sosial
  },
  {
    tittelId: "chat.okonomi.tittel",
    kortTekstId: "chat.okonomi.ingressKort",
    langTekstIds: ["chat.okonomi.ingressKort", "chat.okonomi.ingress", personvernTekstId],
    temaKode: ChatTema.Okonomi
  },
  {
    tittelId: "chat.eures.tittel",
    kortTekstId: "chat.eures.ingressKort",
    langTekstIds: ["chat.eures.ingressKort", "chat.eures.ingress"],
    temaKode: ChatTema.EURES
  },
];

export default chatSideInnhold;
