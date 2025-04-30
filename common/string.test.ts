import { sanitizeString } from './string';

describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
        expect(sanitizeString('<script>alert("XSS")</script>')).toBe(
            'alert(XSS)'
        );
        expect(sanitizeString('<div>Content</div>')).toBe('Content');
    });

    it('should remove special characters', () => {
        expect(sanitizeString('Hello; DROP TABLE users; --')).toBe(
            'Hello DROP TABLE users'
        );
        expect(sanitizeString("Hello ' OR 1=1 --")).toBe('Hello OR 1=1');
    });

    it('should allow valid strings', () => {
        expect(sanitizeString('HelloWorld123')).toBe('HelloWorld123');
        expect(sanitizeString('safe_string-123')).toBe('safe_string-123');
    });

    it('should handle binary garbage and control characters', () => {
        expect(sanitizeString('Hello\x00World')).toBe('HelloWorld');
        expect(sanitizeString('Hello\x1FWorld')).toBe('HelloWorld');
    });

    it('should trim whitespace', () => {
        expect(sanitizeString('   Hello World   ')).toBe('Hello World');
    });

    it('should handle empty or invalid input gracefully', () => {
        expect(sanitizeString('')).toBe('');
        expect(sanitizeString(null)).toBe('');
        expect(sanitizeString(undefined)).toBe('');
    });
});
