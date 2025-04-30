import { sanitizeString, escapeHtml } from './string';

describe('sanitizeString', () => {
    it('should remove HTML tags', () => {
        expect(sanitizeString('<script>alert("XSS")</script>')).toBe(
            '&lt;script&gt;alert(XSS)&lt;/script&gt;'
        );
        expect(sanitizeString('<div>Content</div>')).toBe(
            '&lt;div&gt;Content&lt;/div&gt;'
        );
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

describe('escapeHtml', () => {
    test('should escape HTML special characters', () => {
        expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
        expect(escapeHtml('Hello & World')).toBe('Hello &amp; World');
        expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;');
        expect(escapeHtml("'single'")).toBe('&#039;single&#039;');
    });

    test('should handle strings with multiple HTML special characters', () => {
        expect(escapeHtml('<div class="test">Hello & World</div>')).toBe(
            '&lt;div class=&quot;test&quot;&gt;Hello &amp; World&lt;/div&gt;'
        );
    });

    test('should return the same string if no HTML special characters are present', () => {
        expect(escapeHtml('Hello World')).toBe('Hello World');
        expect(escapeHtml('12345')).toBe('12345');
    });

    test('should handle empty strings', () => {
        expect(escapeHtml('')).toBe('');
    });

    test('should handle strings with only HTML special characters', () => {
        expect(escapeHtml('<>&"\'')).toBe('&lt;&gt;&amp;&quot;&#039;');
    });
});
