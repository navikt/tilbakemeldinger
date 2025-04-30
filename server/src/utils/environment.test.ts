import { describe, expect, it } from '@jest/globals';

// Simple test to verify Jest works in the server directory
describe('Server Environment', () => {
    it('should be able to run tests in server directory', () => {
        expect(true).toBe(true);
    });
});
