import { jest, describe, test, expect, beforeEach } from '@jest/globals';
import { sanitizeObject } from './object';
import * as stringModule from './string';

describe('sanitizeObject', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should return primitives other than strings unmodified', () => {
        expect(sanitizeObject(123)).toBe(123);
        expect(sanitizeObject(true)).toBe(true);
        expect(sanitizeObject(false)).toBe(false);
        expect(sanitizeObject(null)).toBe(null);
        expect(sanitizeObject(undefined)).toBe(undefined);
    });

    test('should sanitize object correcty', () => {
        const mockObject = {
            name: 'John Doe',
            age: 30,
            address: {
                street: '123 Main St',
                city: 'Anytown',
            },
            hobbies: ['reading', 'gaming'],
            bio: '<script>alert("XSS")</script>',
            message: '<div>',
        };
        const sanitizedObject = sanitizeObject(mockObject);
        expect(sanitizedObject.name).toBe('John Doe');
        expect(sanitizedObject.age).toBe(30);
        expect(sanitizedObject.address.street).toBe('123 Main St');
        expect(sanitizedObject.address.city).toBe('Anytown');
        expect(sanitizedObject.hobbies).toEqual(['reading', 'gaming']);
        expect(sanitizedObject.bio).toBe(
            '&lt;script&gt;alert(XSS)&lt;/script&gt;'
        );
        expect(sanitizedObject.message).toBe('&lt;div&gt;');
    });
});
