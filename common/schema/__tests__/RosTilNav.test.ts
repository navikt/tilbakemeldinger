import {
    rosTilNavSchema,
    rosNavKontaktsenterSchema,
    rosNavDigitaleTjenesterSchema,
    rosNavKontorSchema,
} from '../RosTilNav';

describe('RosTilNav Schema', () => {
    // Testing the base discriminated union schema
    describe('RosTilNav Union Schema', () => {
        test('should validate valid NAV Kontaktsenter feedback', () => {
            const validData = {
                hvemRoses: 'NAV_KONTAKTSENTER',
                melding: 'Veldig bra kundeservice fra kontaktsenteret',
            };

            const result = rosTilNavSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate valid NAV Digitale Tjenester feedback', () => {
            const validData = {
                hvemRoses: 'NAV_DIGITALE_TJENESTER',
                melding: 'Nettsidene er veldig brukervennlige',
            };

            const result = rosTilNavSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate valid NAV Kontor feedback', () => {
            const validData = {
                hvemRoses: 'NAV_KONTOR',
                navKontor: 'NAV Oslo',
                melding: 'God hjelp fra saksbehandler',
            };

            const result = rosTilNavSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when discriminator is invalid', () => {
            const invalidData = {
                hvemRoses: 'INVALID_TYPE',
                melding: 'Test melding',
            };

            const result = rosTilNavSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    // Testing specific sub-schemas
    describe('NAV Kontaktsenter Schema', () => {
        test('should validate valid data', () => {
            const validData = {
                hvemRoses: 'NAV_KONTAKTSENTER',
                melding: 'Veldig bra kundeservice',
            };

            const result = rosNavKontaktsenterSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when melding is missing', () => {
            const invalidData = {
                hvemRoses: 'NAV_KONTAKTSENTER',
            };

            const result = rosNavKontaktsenterSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when melding is empty', () => {
            const invalidData = {
                hvemRoses: 'NAV_KONTAKTSENTER',
                melding: '',
            };

            const result = rosNavKontaktsenterSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    describe('NAV Digitale Tjenester Schema', () => {
        test('should validate valid data', () => {
            const validData = {
                hvemRoses: 'NAV_DIGITALE_TJENESTER',
                melding: 'Nettsidene er brukervennlige',
            };

            const result = rosNavDigitaleTjenesterSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when melding is missing', () => {
            const invalidData = {
                hvemRoses: 'NAV_DIGITALE_TJENESTER',
            };

            const result = rosNavDigitaleTjenesterSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });

    describe('NAV Kontor Schema', () => {
        test('should validate valid data', () => {
            const validData = {
                hvemRoses: 'NAV_KONTOR',
                navKontor: 'NAV Oslo',
                melding: 'God hjelp fra saksbehandler',
            };

            const result = rosNavKontorSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should fail when navKontor is missing', () => {
            const invalidData = {
                hvemRoses: 'NAV_KONTOR',
                melding: 'God hjelp',
            };

            const result = rosNavKontorSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when navKontor is empty', () => {
            const invalidData = {
                hvemRoses: 'NAV_KONTOR',
                navKontor: '',
                melding: 'God hjelp',
            };

            const result = rosNavKontorSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });
});
