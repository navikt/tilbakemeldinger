import { describe, test, expect } from 'vitest';
import { createApp } from './index.js';

/*
 * createApp() builds the app without binding a port, so routes can be exercised
 * in-process via app.request(). Config comes from `test.env` in vite.config.ts.
 */
const BASE = '/person/kontakt-oss';
const API = `${BASE}/tilbakemeldinger/api`;

describe('app routes', () => {
    test('liveness and readiness probes answer with JSON', async () => {
        const app = await createApp();

        for (const path of ['isAlive', 'isReady']) {
            const res = await app.request(
                `${BASE}/tilbakemeldinger/api/internal/${path}`
            );
            expect(res.status).toBe(200);
            expect(res.headers.get('content-type')).toContain(
                'application/json'
            );
        }
    });

    test('rejects an unknown mottak path', async () => {
        const app = await createApp();
        const res = await app.request(`${BASE}/tilbakemeldinger/api/mottak/x`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: '{}',
        });
        expect(res.status).toBe(404);
    });

    test('rejects a body that fails schema validation', async () => {
        const app = await createApp();
        const res = await app.request(
            `${BASE}/tilbakemeldinger/api/mottak/ros`,
            {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ not: 'a valid ros' }),
            }
        );
        expect(res.status).toBe(400);
    });

    test('rate limits repeated submissions from one client', async () => {
        const app = await createApp();
        const send = () =>
            app.request(`${BASE}/tilbakemeldinger/api/mottak/ros`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'x-forwarded-for': '203.0.113.9',
                },
                body: '{}',
            });

        const statuses: number[] = [];
        for (let i = 0; i < 7; i++) statuses.push((await send()).status);

        expect(statuses.filter((s) => s === 429).length).toBeGreaterThan(0);
    });
});

const submit = (body: unknown, ip = '198.51.100.1') => ({
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
});

describe('api routes', () => {
    test('unknown api paths 404 as text, not the rendered page', async () => {
        const app = await createApp();
        for (const [path, init] of [
            [`${API}/nope`, undefined],
            [`${API}/internal/nope`, undefined],
            [`${API}/mottak/bogus`, submit({})],
        ] as const) {
            const res = await app.request(path, init as RequestInit);
            expect(res.status).toBe(404);
            expect(res.headers.get('content-type')).toContain('text/plain');
        }
    });

    test('validates the body per route', async () => {
        const app = await createApp();
        const res = await app.request(
            `${API}/mottak/ros`,
            submit({ nope: true }, '198.51.100.2')
        );
        expect(res.status).toBe(400);
        expect(await res.text()).toContain('validering');
    });

    test('guards still apply to every submission route', async () => {
        const app = await createApp();
        const statuses: number[] = [];
        for (let i = 0; i < 7; i++) {
            const res = await app.request(
                `${API}/mottak/feil-og-mangler`,
                submit({}, '198.51.100.3')
            );
            statuses.push(res.status);
        }
        expect(statuses.filter((s) => s === 429).length).toBeGreaterThan(0);
    });

    test('rejects an oversized body', async () => {
        const app = await createApp();
        const res = await app.request(`${API}/mottak/ros`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-forwarded-for': '198.51.100.4',
            },
            body: JSON.stringify({ melding: 'x'.repeat(200 * 1024) }),
        });
        expect(res.status).toBe(413);
    });
});
