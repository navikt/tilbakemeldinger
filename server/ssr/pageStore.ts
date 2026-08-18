import { paths } from '../../common/paths.js';
import { Locale, validLocales } from '../../common/locale.js';
import { renderPage } from './htmlRenderer.js';
import { env } from '../env.js';

const BASEPATH = env.VITE_APP_BASEPATH;

// SSR output is a pure function of the pathname: render() takes only a URL, and
// all user-specific data is fetched client-side. The set of pages that actually
// render is therefore small and fully enumerable - the three form pages in each
// locale. (The /tilbakemeldinger front page 301s to the editorial site outside
// localhost, so it is not in here.)
const PAGE_PATHS = [
    paths.tilbakemeldinger.serviceklage.form,
    paths.tilbakemeldinger.feilogmangler,
    paths.tilbakemeldinger.rostilnav,
];

const REFRESH_MS = 600_000;

type Entry = { html: string; renderedAt: number };

const store = new Map<string, Entry>();
const inFlight = new Set<string>();

export const knownPages: { url: string; locale: Locale }[] =
    validLocales.flatMap((locale) =>
        PAGE_PATHS.map((page) => ({
            url: `${BASEPATH}/${locale}${page}`,
            locale,
        }))
    );

const localeOf = (url: string) => knownPages.find((p) => p.url === url)?.locale;

const renderInto = async (url: string, locale: Locale) => {
    const html = await renderPage(url, locale);
    store.set(url, { html, renderedAt: Date.now() });
    return html;
};

const refreshInBackground = (url: string, locale: Locale) => {
    if (inFlight.has(url)) return;
    inFlight.add(url);
    renderInto(url, locale)
        .catch((e) =>
            console.error(`Background refresh failed for ${url}: ${e}`)
        )
        .finally(() => inFlight.delete(url));
};

export const getPage = async (url: string): Promise<string> => {
    const locale = localeOf(url);

    // Always render fresh in dev so edits show up without a restart.
    if (import.meta.env.DEV) {
        return renderPage(url, locale ?? 'nb');
    }

    // Not one of the known pages: the app renders an empty shell for these
    // anyway (the 404/redirect logic is client-side), so render without storing.
    if (!locale) {
        return renderPage(url, 'nb');
    }

    const entry = store.get(url);
    if (!entry) {
        return renderInto(url, locale);
    }

    // Serve immediately and revalidate behind the request, so no user ever waits
    // on a decorator fetch.
    if (Date.now() - entry.renderedAt > REFRESH_MS) {
        refreshInBackground(url, locale);
    }

    return entry.html;
};

// Best-effort warm-up. Deliberately not awaited by startup: readiness must not
// depend on nav-dekoratoren being reachable.
export const warmPageStore = async () => {
    const results = await Promise.allSettled(
        knownPages.map(({ url, locale }) => renderInto(url, locale))
    );
    const failed = results.filter((r) => r.status === 'rejected').length;
    console.log(
        `Page store warmed: ${results.length - failed}/${results.length} pages` +
            (failed ? ` (${failed} failed, will render on demand)` : '')
    );
};

export const startPageStoreRefresh = () => {
    const timer = setInterval(() => {
        knownPages.forEach(({ url, locale }) =>
            refreshInBackground(url, locale)
        );
    }, REFRESH_MS);
    timer.unref();
    return timer;
};
