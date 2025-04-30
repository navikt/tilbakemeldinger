import { sanitizePath } from './paths';

describe('sanitizePath', () => {
    test('should remove leading and trailing slashes', () => {
        expect(sanitizePath('/example/')).toBe('/example');
        expect(sanitizePath('/example')).toBe('/example');
        expect(sanitizePath('example/')).toBe('/example');
    });

    test('should remove multiple leading, mid or trailing slashes', () => {
        expect(sanitizePath('///example///')).toBe('/example');
        expect(sanitizePath('///example')).toBe('/example');
        expect(sanitizePath('example//path')).toBe('/example/path');
        expect(sanitizePath('/example//path/')).toBe('/example/path');
        expect(sanitizePath('example///path')).toBe('/example/path');
    });

    test('should handle complex path sanitization', () => {
        expect(sanitizePath('///example//path//to///resource///')).toBe(
            '/example/path/to/resource'
        );
    });

    test('should handle empty paths', () => {
        expect(sanitizePath('')).toBe('');
    });

    test('should handle paths with only slashes', () => {
        expect(sanitizePath('//')).toBe('/');
        expect(sanitizePath('////')).toBe('/');
    });
});
