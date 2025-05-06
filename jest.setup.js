// Import jest-dom's custom assertions
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { TextEncoder, TextDecoder } from 'util';

// Mock global objects if needed
global.fetch = jest.fn();

// Reset mocks between tests
beforeEach(() => {
    jest.clearAllMocks();
});

// Fix for ES modules in Jest
Object.defineProperty(globalThis, 'TextEncoder', { value: TextEncoder });
Object.defineProperty(globalThis, 'TextDecoder', { value: TextDecoder });
