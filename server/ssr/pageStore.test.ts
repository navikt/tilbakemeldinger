import { describe, test, expect, vi, beforeEach } from 'vitest';

const { renderPage } = vi.hoisted(() => ({ renderPage: vi.fn() }));
vi.mock('./htmlRenderer.js', () => ({ renderPage }));

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// The store keeps module-level state, so each test gets a fresh copy. DEV is
// true under vitest and getPage short-circuits on it, so it is stubbed off.
const freshStore = async () => {
    vi.resetModules();
    return import('./pageStore.js');
};

describe('pageStore', () => {
    beforeEach(() => {
        vi.useRealTimers();
        renderPage.mockReset();
        vi.stubEnv('DEV', false);
    });

    test('should render once when concurrent requests hit a cold page', async () => {
        renderPage.mockImplementation(async () => {
            await sleep(20);
            return '<html>rendered</html>';
        });

        const { getPage, knownPages } = await freshStore();
        const { url } = knownPages[0];

        const results = await Promise.all(
            Array.from({ length: 5 }, () => getPage(url))
        );

        expect(renderPage).toHaveBeenCalledTimes(1);
        expect(new Set(results).size).toBe(1);
    });

    test('should serve the stored page on a second request', async () => {
        renderPage.mockResolvedValue('<html>stored</html>');

        const { getPage, knownPages } = await freshStore();
        const { url } = knownPages[0];

        await getPage(url);
        await getPage(url);

        expect(renderPage).toHaveBeenCalledTimes(1);
    });

    test('should keep serving the previous page when a re-render fails', async () => {
        vi.useFakeTimers();
        renderPage.mockResolvedValueOnce('<html>first</html>');

        const { getPage, knownPages } = await freshStore();
        const { url } = knownPages[0];
        expect(await getPage(url)).toBe('<html>first</html>');

        // Past the refresh interval, so the next read revalidates behind itself.
        vi.setSystemTime(Date.now() + 600_001);
        renderPage.mockRejectedValue(new Error('decorator down'));

        // Stale page served immediately rather than waiting on the re-render.
        expect(await getPage(url)).toBe('<html>first</html>');
        await vi.waitFor(() => expect(renderPage).toHaveBeenCalledTimes(2));

        // And the failure did not evict it.
        expect(await getPage(url)).toBe('<html>first</html>');
        vi.useRealTimers();
    });

    test('should render an unknown path without storing it', async () => {
        renderPage.mockResolvedValue('<html>shell</html>');

        const { getPage } = await freshStore();
        const unknown = '/person/kontakt-oss/nb/not-a-page';

        await getPage(unknown);
        await getPage(unknown);

        expect(renderPage).toHaveBeenCalledTimes(2);
    });
});
