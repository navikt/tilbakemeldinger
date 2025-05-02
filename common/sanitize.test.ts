import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import {
    sanitize,
    sanitizeString,
    escapeHtml,
    sanitizeHumanReadable,
} from './sanitize';

describe('sanitizeObject', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should identify and handle the types without corrupting the objects integrit or schema', () => {
        const mockObject = {
            name: 'Tilbakemelding',
            antall: 30,
            meta: {
                data1: '123 Main St',
                data2: 'Anytown',
            },
            hobbies: ['reading', 'gaming'],
            bio: '<script>alert("XSS")</script>',
            message: '<div>',
        };
        const sanitizedObject = sanitize(mockObject);
        expect(typeof sanitizedObject.name).toBe('string');
        expect(typeof sanitizedObject.antall).toBe('number');
        expect(typeof sanitizedObject.meta).toBe('object');
        expect(Object.keys(sanitizedObject.meta).length).toBe(2);
        expect(typeof sanitizedObject.meta.data2).toBe('string');
        expect(Array.isArray(sanitizedObject.hobbies)).toBe(true);
        expect(
            sanitizedObject.hobbies.every(
                (hobby: string) => typeof hobby === 'string'
            )
        ).toBe(true);
    });
});

describe('sanitizeString', () => {
    it('should escape HTML tags', () => {
        expect(sanitizeString('<script>alert("XSS")</script>')).toBe(
            '&lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;'
        );
        expect(sanitizeString('<div>Content</div>')).toBe(
            '&lt;div&gt;Content&lt;/div&gt;'
        );
    });

    it('should escape special characters', () => {
        expect(sanitizeString('Hello; DROP TABLE users; --')).toBe(
            'Hello\\; DROP TABLE users\\; \\--'
        );
        expect(sanitizeString("Hello ' OR 1=1 --")).toBe(
            'Hello &#039; OR 1=1 \\--'
        );
    });

    it('removes typical XSS attack vectors', () => {
        expect(
            sanitizeString(
                '<img src=x onerror=alert(1)><script>alert(1)</script>'
            )
        ).toBe(
            '&lt;img src=x onerror=alert(1)&gt;&lt;script&gt;alert(1)&lt;/script&gt;'
        );
        expect(
            sanitizeString(
                '<iframe src="javascript:alert(1)"></iframe><script>alert(1)</script>'
            )
        ).toBe(
            '&lt;iframe src=&quot;javascript:alert(1)&quot;&gt;&lt;/iframe&gt;&lt;script&gt;alert(1)&lt;/script&gt;'
        );
    });

    it('should does not mangle or remove normally used characters', () => {
        expect(
            sanitizeString(
                'Hei! En vanlig tekst (og parantes) 1, 2, 3, og 4. Prosent 110% og; semikolon - med et påheng æøå?'
            )
        ).toBe(
            'Hei! En vanlig tekst (og parantes) 1, 2, 3, og 4. Prosent 110% og\\; semikolon - med et påheng æøå?'
        );
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

    it('shoul preserve newlines', () => {
        const input = 'Hello\nWorld';
        expect(sanitizeString(input)).toBe(input);
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

describe('sanitizeHumanReadable', () => {
    test('should allow standard ASCII printable characters', () => {
        const input = 'Hello World! 123 #$%&*()_+';
        expect(sanitizeHumanReadable(input)).toBe(input);
    });

    test('should allow special Nordic or Cyrrilic characters', () => {
        const input = 'æøåÆØÅéèêëüûùñßðþüÜÖöäÄñÑçÇ';
        expect(sanitizeHumanReadable(input)).toBe(input);
    });

    test('should allow common symbols and punctuation', () => {
        const input = '!@#$%^&*()_+-=[]{}|;:,./<>?`~"\'\\';
        expect(sanitizeHumanReadable(input)).toBe(input);
    });

    test('should filter out control characters', () => {
        expect(sanitizeHumanReadable('Hello\x00World')).toBe('HelloWorld');
        expect(sanitizeHumanReadable('Hello\x01\x02\x03\x04World')).toBe(
            'HelloWorld'
        );
        expect(sanitizeHumanReadable('Hello\x1F\x1EWorld')).toBe('HelloWorld');
    });

    test('should filter out the DEL character (127)', () => {
        expect(sanitizeHumanReadable('Hello\x7FWorld')).toBe('HelloWorld');
    });

    test('should filter out control characters between 128-159', () => {
        expect(sanitizeHumanReadable('Hello\x80\x81\x82World')).toBe(
            'HelloWorld'
        );
        expect(sanitizeHumanReadable('Hello\x9F\x9EWorld')).toBe('HelloWorld');
    });

    test('should allow all printable extended characters above 159', () => {
        // This includes characters like €, £, ¥, etc.
        const input = '€£¥©®™¶§';
        expect(sanitizeHumanReadable(input)).toBe(input);
    });

    test('should filter out non-printable unicode characters above 65533', () => {
        // Characters above 65533 are often very rare or used for special purposes
        expect(sanitizeHumanReadable('Hello\uFFFF\uFFFEWorld')).toBe(
            'HelloWorld'
        );
    });

    test('should handle mixed valid and invalid characters', () => {
        expect(sanitizeHumanReadable('Æøå\x00\x01Üöä\x7F\x80ñÑ\uFFFF')).toBe(
            'ÆøåÜöäñÑ'
        );
    });

    test('should handle empty strings', () => {
        expect(sanitizeHumanReadable('')).toBe('');
    });
});
