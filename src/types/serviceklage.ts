export type ON_BEHALF_OF = "PRIVATPERSON" | "ANNEN_PERSON" | "BEDRIFT";

export type OutboundServiceKlageBase = {
  klagetekst: string;
  oenskerAaKontaktes?: boolean;
};

export type OutboundServiceKlageType =
  | {
      klagetype: "LOKALT_NAV_KONTOR";
      gjelderSosialhjelp: "JA" | "NEI" | "VET_IKKE";
    }
  | {
      klagetype: "TELEFON" | "NAVNO" | "BREV" | "ANNET";
    };

export type OutboundServiceKlageExtend =
  | {
      paaVegneAv: "PRIVATPERSON";
      innmelder: {
        navn: string;
        telefonnummer?: string;
        personnummer: string;
      };
    }
  | {
      paaVegneAv: "ANNEN_PERSON";
      innmelder: {
        navn: string;
        telefonnummer?: string;
        harFullmakt: boolean;
        rolle: string;
      };
      paaVegneAvPerson: {
        navn: string;
        personnummer: string;
      };
    }
  | {
      paaVegneAv: "BEDRIFT";
      innmelder: {
        navn: string;
        telefonnummer?: string;
        rolle?: string;
      };
      paaVegneAvBedrift: {
        navn: string;
        organisasjonsnummer: string;
        postadresse?: string;
      };
    };
