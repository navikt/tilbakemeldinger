export const baseUrl = "/person/kontakt-oss";

export const urls = {
  forside: baseUrl,
  tilbakemeldinger: {
    forside: `${baseUrl}/tilbakemeldinger`,
    serviceklage: {
      form: `${baseUrl}/tilbakemeldinger/service-klage`,
      login: `${baseUrl}/tilbakemeldinger/service-klage/login`
    }
  },
  skrivTilOss: {
    forside: `${baseUrl}/skriv-til-oss`,
    arbeidssoker: `${baseUrl}/skriv-til-oss/arbeidssoker`,
    familieogbarn: `${baseUrl}/skriv-til-oss/familieogbarn`,
    pensjonist: "#",
    syk: "#",
    hjelpemidler: `${baseUrl}/skriv-til-oss/hjelpemidler`
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
    bil: "#"
  }
};

export const svartidDager = 2;
