import {
    serviceKlageSchema,
    serviceKlageBaseSchema,
    privatpersonSchema,
    annenPersonSchema,
    bedriftSchema,
    onBehalfOfSchema,
    serviceKlageTypeSchema,
    sosialhjelpChoiceSchema,
} from '../ServiceKlage';

describe('ServiceKlage Schema', () => {
    // Testing base schema
    describe('Base Schema', () => {
        test('should validate when all required fields are present', () => {
            const validData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['LOKALT_NAV_KONTOR'],
                oenskerAaKontaktes: true,
                gjelderSosialhjelp: 'JA',
            };

            const result = serviceKlageBaseSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate with multiple klagetyper', () => {
            const validData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['LOKALT_NAV_KONTOR', 'TELEFON', 'BREV'],
            };

            const result = serviceKlageBaseSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when required fields are missing', () => {
            const invalidData = {
                klagetekst: 'Dette er en klage',
                // Missing klagetyper
            };

            const result = serviceKlageBaseSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when klagetyper is empty', () => {
            const invalidData = {
                klagetekst: 'Dette er en klage',
                klagetyper: [],
            };

            const result = serviceKlageBaseSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when klagetekst is empty', () => {
            const invalidData = {
                klagetekst: '',
                klagetyper: ['TELEFON'],
            };

            const result = serviceKlageBaseSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    // Testing privatperson schema
    describe('Privatperson Schema', () => {
        test('should validate valid privatperson data', () => {
            const validData = {
                paaVegneAv: 'PRIVATPERSON',
                innmelder: {
                    navn: 'Ola Nordmann',
                    personnummer: '12345678901',
                    telefonnummer: '99988777',
                },
            };

            const result = privatpersonSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate without optional telefonnummer', () => {
            const validData = {
                paaVegneAv: 'PRIVATPERSON',
                innmelder: {
                    navn: 'Ola Nordmann',
                    personnummer: '12345678901',
                },
            };

            const result = privatpersonSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when personnummer is incorrect format', () => {
            const invalidData = {
                paaVegneAv: 'PRIVATPERSON',
                innmelder: {
                    navn: 'Ola Nordmann',
                    personnummer: '123456', // Too short
                },
            };

            const result = privatpersonSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when navn is empty', () => {
            const invalidData = {
                paaVegneAv: 'PRIVATPERSON',
                innmelder: {
                    navn: '',
                    personnummer: '12345678901',
                },
            };

            const result = privatpersonSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    // Testing annenPerson schema
    describe('Annen Person Schema', () => {
        test('should validate valid annen person data', () => {
            const validData = {
                paaVegneAv: 'ANNEN_PERSON',
                innmelder: {
                    navn: 'Kari Nordmann',
                    telefonnummer: '99988777',
                    harFullmakt: true,
                    rolle: 'Verge',
                },
                paaVegneAvPerson: {
                    navn: 'Per Hansen',
                    personnummer: '12345678901',
                },
            };

            const result = annenPersonSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when required fields are missing', () => {
            const invalidData = {
                paaVegneAv: 'ANNEN_PERSON',
                innmelder: {
                    navn: 'Kari Nordmann',
                    // Missing harFullmakt
                    rolle: 'Verge',
                },
                paaVegneAvPerson: {
                    navn: 'Per Hansen',
                    personnummer: '12345678901',
                },
            };

            const result = annenPersonSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    // Testing bedrift schema
    describe('Bedrift Schema', () => {
        test('should validate valid bedrift data', () => {
            const validData = {
                paaVegneAv: 'BEDRIFT',
                enhetsnummerPaaklaget: '123',
                innmelder: {
                    navn: 'Ola Chef',
                    telefonnummer: '99988777',
                    rolle: 'HR Ansvarlig',
                },
                paaVegneAvBedrift: {
                    navn: 'Acme AS',
                    organisasjonsnummer: '123456789',
                    postadresse: 'Acmeveien 1, 0123 Oslo',
                },
            };

            const result = bedriftSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate without optional fields', () => {
            const validData = {
                paaVegneAv: 'BEDRIFT',
                enhetsnummerPaaklaget: '123',
                innmelder: {
                    navn: 'Ola Chef',
                },
                paaVegneAvBedrift: {
                    navn: 'Acme AS',
                    organisasjonsnummer: '123456789',
                },
            };

            const result = bedriftSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when organisasjonsnummer is incorrect format', () => {
            const invalidData = {
                paaVegneAv: 'BEDRIFT',
                enhetsnummerPaaklaget: '123',
                innmelder: {
                    navn: 'Ola Chef',
                },
                paaVegneAvBedrift: {
                    navn: 'Acme AS',
                    organisasjonsnummer: '12345', // Too short
                },
            };

            const result = bedriftSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    // Testing the combined schema
    describe('Complete ServiceKlage Schema', () => {
        test('should validate complete privatperson service klage', () => {
            const validData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['LOKALT_NAV_KONTOR'],
                oenskerAaKontaktes: true,
                gjelderSosialhjelp: 'JA',
                klagetypeUtdypning: 'Utdypende informasjon',
                paaVegneAv: 'PRIVATPERSON',
                innmelder: {
                    navn: 'Ola Nordmann',
                    personnummer: '12345678901',
                    telefonnummer: '99988777',
                },
            };

            const result = serviceKlageSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate complete annen person service klage', () => {
            const validData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['TELEFON', 'BREV'],
                oenskerAaKontaktes: false,
                gjelderSosialhjelp: 'NEI',
                paaVegneAv: 'ANNEN_PERSON',
                innmelder: {
                    navn: 'Kari Nordmann',
                    telefonnummer: '99988777',
                    harFullmakt: true,
                    rolle: 'Verge',
                },
                paaVegneAvPerson: {
                    navn: 'Per Hansen',
                    personnummer: '12345678901',
                },
            };

            const result = serviceKlageSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate complete bedrift service klage', () => {
            const validData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['NAV_DIGITALE_TJENESTER'],
                gjelderSosialhjelp: 'VET_IKKE',
                oenskerAaKontaktes: true,
                paaVegneAv: 'BEDRIFT',
                enhetsnummerPaaklaget: '123',
                innmelder: {
                    navn: 'Ola Chef',
                    telefonnummer: '99988777',
                    rolle: 'HR Ansvarlig',
                },
                paaVegneAvBedrift: {
                    navn: 'Acme AS',
                    organisasjonsnummer: '123456789',
                    postadresse: 'Acmeveien 1, 0123 Oslo',
                },
            };

            const result = serviceKlageSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail bedrift service klage when oenskerAaKontaktes is false', () => {
            const invalidData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['NAV_DIGITALE_TJENESTER'],
                gjelderSosialhjelp: 'VET_IKKE',
                oenskerAaKontaktes: false,
                paaVegneAv: 'BEDRIFT',
                enhetsnummerPaaklaget: '123',
                innmelder: {
                    navn: 'Ola Chef',
                    telefonnummer: '99988777',
                    rolle: 'HR Ansvarlig',
                },
                paaVegneAvBedrift: {
                    navn: 'Acme AS',
                    organisasjonsnummer: '123456789',
                    postadresse: 'Acmeveien 1, 0123 Oslo',
                },
            };

            const result = serviceKlageSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail bedrift service klage when oenskerAaKontaktes is missing', () => {
            const invalidData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['NAV_DIGITALE_TJENESTER'],
                gjelderSosialhjelp: 'VET_IKKE',
                paaVegneAv: 'BEDRIFT',
                enhetsnummerPaaklaget: '123',
                innmelder: {
                    navn: 'Ola Chef',
                    telefonnummer: '99988777',
                    rolle: 'HR Ansvarlig',
                },
                paaVegneAvBedrift: {
                    navn: 'Acme AS',
                    organisasjonsnummer: '123456789',
                    postadresse: 'Acmeveien 1, 0123 Oslo',
                },
            };

            const result = serviceKlageSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when combining invalid parts', () => {
            const invalidData = {
                klagetekst: 'Dette er en klage på service',
                klagetyper: ['LOKALT_NAV_KONTOR'],
                paaVegneAv: 'PRIVATPERSON',
                innmelder: {
                    navn: 'Ola Nordmann',
                    personnummer: '123456', // Invalid format
                },
            };

            const result = serviceKlageSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });
});
