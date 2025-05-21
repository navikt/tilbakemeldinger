import { feilOgManglerSchema, FeilOgManglerTypeSchema } from '../FeilOgMangler';

describe('FeilOgMangler Schema', () => {
    // Valid test cases
    describe('Valid data', () => {
        test('should validate when all required fields are present with correct types', () => {
            const validData = {
                onskerKontakt: true,
                epost: 'test@example.com',
                feiltype: 'TEKNISK_FEIL',
                melding: 'Dette er en testmelding om teknisk feil',
            };

            const result = feilOgManglerSchema.safeParse(validData);
            expect(result.success).toBe(true);
        });

        test('should validate all available feiltype values', () => {
            const feiltypes = [
                'TEKNISK_FEIL',
                'FEIL_INFO',
                'UNIVERSELL_UTFORMING',
            ];

            feiltypes.forEach((type) => {
                const validData = {
                    onskerKontakt: false,
                    feiltype: type,
                    melding: 'Test melding',
                };

                const result = feilOgManglerSchema.safeParse(validData);
                expect(result.success).toBe(true);
            });
        });
    });

    // Invalid test cases
    describe('Invalid data', () => {
        test('should fail when required fields are missing', () => {
            const invalidData = {
                onskerKontakt: true,
                // missing feiltype and melding
            };

            const result = feilOgManglerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when email format is invalid', () => {
            const invalidData = {
                onskerKontakt: true,
                epost: 'invalid-email',
                feiltype: 'TEKNISK_FEIL',
                melding: 'Dette er en testmelding',
            };

            const result = feilOgManglerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when feiltype is invalid', () => {
            const invalidData = {
                onskerKontakt: false,
                feiltype: 'UNKNOWN_TYPE', // Invalid type
                melding: 'Dette er en testmelding',
            };

            const result = feilOgManglerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });

        test('should fail when melding is empty', () => {
            const invalidData = {
                onskerKontakt: false,
                feiltype: 'TEKNISK_FEIL',
                melding: '', // Empty string
            };

            const result = feilOgManglerSchema.safeParse(invalidData);
            expect(result.success).toBe(false);
        });
    });
});
