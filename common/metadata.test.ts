import { describe, test, expect } from 'vitest';
import { getPageMetadata, fallbackMetadata } from './metadata.js';
import { appPathFromPathname } from './appPath.js';
import { paths } from './paths.js';
import { validLocales } from './locale.js';

const BASE = paths.kontaktOss.forside;
const ORIGIN = 'https://www.nav.no';

const forUrl = (pathname: string, locale: 'nb' | 'nn' | 'en') =>
    getPageMetadata(appPathFromPathname(pathname), locale, ORIGIN);

describe('appPathFromPathname', () => {
    test('should strip the base path and the locale', () => {
        expect(
            appPathFromPathname(`${BASE}/nb/tilbakemeldinger/serviceklage`)
        ).toBe(paths.tilbakemeldinger.serviceklage.form);
    });

    test('should strip the base path when no locale is present', () => {
        expect(appPathFromPathname(`${BASE}/tilbakemeldinger`)).toBe(
            paths.tilbakemeldinger.forside
        );
    });

    test('should only strip an anchored prefix', () => {
        expect(appPathFromPathname(`/annet${BASE}/nb/tilbakemeldinger`)).toBe(
            `/annet${BASE}/nb/tilbakemeldinger`
        );
    });
});

describe('getPageMetadata', () => {
    test('should resolve title, description and canonical for a known page', () => {
        expect(
            forUrl(`${BASE}/nb/tilbakemeldinger/serviceklage`, 'nb')
        ).toEqual({
            title: 'Klage på service',
            documentTitle: 'Klage på service - www.nav.no',
            description:
                'Send klage på service hos Nav. Hva gjelder tilbakemeldingen og hvem skriver du på vegne av?',
            canonicalUrl: `${ORIGIN}${BASE}/nb/tilbakemeldinger/serviceklage`,
        });
    });

    test('should translate per locale', () => {
        expect(
            forUrl(`${BASE}/en/tilbakemeldinger/ros-til-nav`, 'en').title
        ).toBe('Praise for Nav');
        expect(
            forUrl(`${BASE}/nn/tilbakemeldinger/feil-og-mangler`, 'nn').title
        ).toBe('Feil og manglar på nav.no');
    });

    /*
     * The canonical is built from the locale, not from the path it was asked
     * about: an unlocalised URL redirects to the default locale client-side, so
     * that is the address the page actually lives at.
     */
    test('should point the canonical at the localised URL', () => {
        expect(forUrl(`${BASE}/tilbakemeldinger`, 'nb').canonicalUrl).toBe(
            `${ORIGIN}${BASE}/nb/tilbakemeldinger`
        );
    });

    /*
     * Every path reaches the SSR catch-all, so this is the common case. A
     * description or canonical here would describe a page that does not exist.
     */
    test('should fall back to a bare title for an unknown path', () => {
        const metadata = forUrl(`${BASE}/nb/finnes-ikke`, 'nb');

        expect(metadata.documentTitle).toBe(
            'Klage og tilbakemelding - www.nav.no'
        );
        expect(metadata.description).toBeUndefined();
        expect(metadata.canonicalUrl).toBeUndefined();
    });

    test('should give every page a title in every locale', () => {
        const pages = [
            paths.tilbakemeldinger.forside,
            paths.tilbakemeldinger.serviceklage.form,
            paths.tilbakemeldinger.feilogmangler,
            paths.tilbakemeldinger.rostilnav,
        ];

        for (const locale of validLocales) {
            for (const page of pages) {
                const metadata = getPageMetadata(page, locale, ORIGIN);

                // translate() returns the key itself when it is missing, so a
                // title equal to its key means an untranslated page.
                expect(metadata.title).not.toContain('sidetittel');
                expect(metadata.description).not.toContain('seo.');
                expect(metadata.canonicalUrl).toBe(
                    `${ORIGIN}${BASE}/${locale}${page}`
                );
            }
        }
    });
});

describe('fallbackMetadata', () => {
    test('should carry a title and nothing else', () => {
        expect(fallbackMetadata('en')).toEqual({
            title: 'Complaints and feedback',
            documentTitle: 'Complaints and feedback - www.nav.no',
        });
    });
});
