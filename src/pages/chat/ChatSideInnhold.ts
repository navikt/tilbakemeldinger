import { ChatTemaData, ChatTema } from "../../types/chat";

const chatSideInnhold: Array<ChatTemaData> = [
  {
    tittelId: "chat.familie.tittel",
    kortTekstId: "chat.familie.ingressKort",
    langTekstId: "chat.familie.ingress",
    temaKode: ChatTema.Familie,
  },
  {
    tittelId: "chat.aap.tittel",
    kortTekstId: "chat.aap.ingressKort",
    langTekstId: "chat.aap.ingress",
    temaKode: ChatTema.AAP
  },
  {
    tittelId: "chat.sosialhjelp.tittel",
    kortTekstId: "chat.sosialhjelp.ingressKort",
    langTekstId: "chat.sosialhjelp.ingress",
    temaKode: ChatTema.Sosial,
  },
  {
    tittelId: "chat.okonomi.tittel",
    kortTekstId: "chat.okonomi.ingressKort",
    langTekstId: "chat.okonomi.ingress",
    temaKode: ChatTema.Okonomi
  },
];

export default chatSideInnhold;
