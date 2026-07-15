export type ON_BEHALF_OF = 'PRIVATPERSON' | 'ANNEN_PERSON' | 'BEDRIFT';

export type ServiceKlageBase = {
    klagetekst: string;
    oenskerAaKontaktes?: boolean;
};

export type ServiceKlageFragment =
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

export type ServiceKlage = ServiceKlageBase & ServiceKlageFragment;
