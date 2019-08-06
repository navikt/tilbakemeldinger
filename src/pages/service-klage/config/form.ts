export const baseFormConfig = {
  hvaGjelder: {
    isRequired: "Du må velge hva tilbakemeldingen gjelder"
  },
  hvemFra: {
    isRequired: "Du må velge hvem tilbakemeldingen er på vegne av"
  },
  onskerKontakt: {
    isRequired: "Du må velge om du ønsker at vi tar kontakt"
  },
  melding: {
    isRequired: "Melding er påkrevd"
  }
};

export const privPersFormConfig = {
  innmelderNavn: {
    isRequired: "Navn er påkrevd"
  },
  innmelderFnr: {
    isRequired: "Fødselsnummer er påkrevd",
    isExactLength: {
      message: "Fødselsnummer må være 11 siffer",
      length: 11
    }
  }
};

export const annenPersFormConfig = {
  innmelderNavn: {
    isRequired: "Navn er påkrevd"
  },
  innmelderFnr: {
    isRequired: "Fødselsnummer er påkrevd",
    isExactLength: {
      message: "Fødselsnummer må være 11 siffer",
      length: 11
    }
  },
  paaVegneAvNavn: {
    isRequired: "Navn er påkrevd"
  },
  paaVegneAvFodselsnr: {
    isRequired: "Fødselsnummer er påkrevd",
    isExactLength: {
      message: "Fødselsnummer må være 11 siffer",
      length: 11
    }
  },
  fullmakt: {
    isRequired: "Fullmakt er påkrevd"
  },
  rolle: {
    isRequired: "Rolle er påkrevd"
  }
};

export const bedriftFormConfig = {
  orgNavn: {
    isRequired: "Organisasjonsnavn er påkrevd"
  },
  orgNummer: {
    isRequired: "Organisasjonsnummer er påkrevd",
    isExactLength: {
      message: "Organisasjonsnummer må ha 9 siffer",
      length: 9
    }
  },
  orgPostadr: {
    isRequired: "Postadresse er påkrevd"
  },
  orgTlfNr: {
    isRequired: "Telefonnummer er påkrevd"
  }
};

export const tlfFormConfig = {
  innmelderTlfnr: {
    isRequired: "Telefonnummer er påkrevd"
  }
};
