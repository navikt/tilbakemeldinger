export type ON_BEHALF_OF = 'PRIVATPERSON' | 'ANNEN_PERSON' | 'BEDRIFT';

export type KLAGE_TYPE =
    | 'LOKALT_NAV_KONTOR'
    | 'TELEFON'
    | 'NAV_DIGITALE_TJENESTER'
    | 'BREV'
    | 'ANNET';

export type OutboundServiceKlageBase = {
    klagetekst: string;
    oenskerAaKontaktes?: boolean;
    gjelderSosialhjelp?: 'JA' | 'NEI' | 'VET_IKKE';
    klagetypeUtdypning?: string;
    klagetyper: KLAGE_TYPE[];
};

export type OutboundServiceKlageExtend =
    | {
          paaVegneAv: 'PRIVATPERSON';
          innmelder: {
              navn: string;
              telefonnummer?: string;
              personnummer: string;
          };
      }
    | {
          paaVegneAv: 'ANNEN_PERSON';
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
          paaVegneAv: 'BEDRIFT';
          enhetsnummerPaaklaget: string;
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
