export const baseUrl = "/person/kontakt-oss";

export const urls = {
  baseUrl: baseUrl,
  forside: baseUrl,
  tilbakemeldinger: `${baseUrl}/tilbakemeldinger`,
  skrivTilOss: {
  "forside": `${baseUrl}/skriv-til-oss`,
    "arbeidssoker": `${baseUrl}/skriv-til-oss/arbeidssoker`,
    "familieogbarn": `${baseUrl}/skriv-til-oss/familieogbarn`,
    "pensjonist": "#",
    "syk": "#",
    "hjelpemidler": `${baseUrl}/skriv-til-oss/hjelpemidler`,
  },
  facebook: "#",
  snapchat: "#",
  temaArbeidssoker: {
    veileder: "#",
    chat: "#",
    skrivtiloss: "#",
  },
  temaFamilieOgBarn: {
    chat: "#",
    skrivtiloss: "#",
  },
  temaHjelpemidler: {
    generelt: "#",
    skrivtiloss: "#",
    bil: "#",
  },
};

export const vars = {
  svartidDager: 2,
  unleashTimeout: 3000,
  skrivTilOssToggleDefault: true,
};
