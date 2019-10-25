import { ChatTema } from "./types/chat";

export const baseUrl = "/person/kontakt-oss";

export const urls = {
  baseUrl: baseUrl,
  forside: baseUrl,
  tilbakemeldinger: {
    forside: `${baseUrl}/tilbakemeldinger`,
    serviceklage: {
      form: `${baseUrl}/tilbakemeldinger/serviceklage`,
      login: `${baseUrl}/tilbakemeldinger/serviceklage/login`
    },
    feilogmangler: `${baseUrl}/tilbakemeldinger/feil-og-mangler`,
    rostilnav: `${baseUrl}/tilbakemeldinger/ros-til-nav`
  },
  skrivTilOss: {
    forside: `${baseUrl}/skriv-til-oss`,
    arbeidssoker: `${baseUrl}/skriv-til-oss/arbeidssoker`,
    familieogbarn: `${baseUrl}/skriv-til-oss/familieogbarn`,
    pensjonist: "#",
    syk: "#",
    hjelpemidler: `${baseUrl}/skriv-til-oss/hjelpemidler`
  },
  chat: {
    forside: `${baseUrl}/chat`,
    familie: `${baseUrl}/chat/familie`,
    aap: `${baseUrl}/chat/aap`,
    sosialhjelp: `${baseUrl}/chat/sosialhjelp`,
    okonomi: `${baseUrl}/chat/okonomi`,
  },
  chatBotApi: {
    sessionConfig: "https://api.puzzel.com/chat/v1/sessions",
  },
  facebook: "#",
  snapchat: "#",
  temaArbeidssoker: {
    veileder: "#",
    chat: "#",
    skrivtiloss: "#"
  },
  temaFamilieOgBarn: {
    chat: "#",
    skrivtiloss: "#"
  },
  temaHjelpemidler: {
    generelt: "#",
    skrivtiloss: "#",
    bil: "#",
  },
};

export const vars = {
  svartidDager: 2,
  unleash: {
    timeout: 3000,
    skrivTilOssEnabledDefault: true,
    skrivTilOssEnabledName: "kontakt-oss.skriv-til-oss",
    langSvartidDefault: false,
    langSvartidName: "kontakt-oss.skriv-til-oss.lang-svartid",
    tekniskProblemDefault: false,
    tekniskProblemName: "kontakt-oss.teknisk-problem"
  },
  chatBot: {
    queueKeyBot: "Q_CHAT_BOT",
    queueKeyHuman: "Q_CHAT_AGENT",
    customerKey: "41155",
    configIds: {
      [ChatTema.AAP]: "7f6b-4569-81a1-27202c419953",
      [ChatTema.Familie]: "c3372a51-6434-4770-a0aa-6e4edba3471e",
      [ChatTema.Sosial]: "",
      [ChatTema.Okonomi]: "",
    }
  }
};
