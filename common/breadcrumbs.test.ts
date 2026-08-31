import { describe, test, expect } from 'vitest';
import { getBreadcrumbsFromPathname } from './breadcrumbs.js';
import { paths } from './paths.js';
import { validLocales, translate } from './locale.js';

const BASE = paths.kontaktOss.forside;

const titles = (pathname: string, locale: 'nb' | 'nn' | 'en') =>
    getBreadcrumbsFromPathname(pathname, locale).map((crumb) => crumb.title);

const urls = (pathname: string, locale: 'nb' | 'nn' | 'en') =>
    getBreadcrumbsFromPathname(pathname, locale).map((crumb) => crumb.url);

describe('getBreadcrumbsFromPathname', () => {
    describe('known routes', () => {
        test('should build the full trail for a form page', () => {
            const pathname = `${BASE}/nb/tilbakemeldinger/serviceklage`;

            expect(titles(pathname, 'nb')).toEqual([
                'Kontakt oss',
                'Tilbakemelding',
                'Klage på service',
            ]);
            expect(urls(pathname, 'nb')).toEqual([
                `${BASE}/nb`,
                `${BASE}/nb/tilbakemeldinger`,
                `${BASE}/nb/tilbakemeldinger/serviceklage`,
            ]);
        });

        test('should translate titles per locale', () => {
            expect(
                titles(`${BASE}/en/tilbakemeldinger/ros-til-nav`, 'en')
            ).toEqual(['Contact us', 'Feedback', 'Praise']);
            expect(
                titles(`${BASE}/nn/tilbakemeldinger/feil-og-mangler`, 'nn')
            ).toEqual(['Kontakt oss', 'Tilbakemelding', 'Feil og manglar']);
        });

        test('should mark only the base crumb as external', () => {
            const crumbs = getBreadcrumbsFromPathname(
                `${BASE}/nb/tilbakemeldinger/serviceklage`,
                'nb'
            );

            expect(crumbs.map((crumb) => crumb.handleInApp)).toEqual([
                false,
                true,
                true,
            ]);
        });

        test('should ignore a trailing slash', () => {
            expect(titles(`${BASE}/nb/tilbakemeldinger/`, 'nb')).toEqual([
                'Kontakt oss',
                'Tilbakemelding',
            ]);
        });
    });

    describe('nynorsk base crumb', () => {
        // Deliberate since 7be57f2f (issue 442): the external Kontakt oss page
        // has no nynorsk version, and the base crumb is handleInApp: false, so
        // the decorator navigates to this URL directly.
        test('should point at nb while its children stay on nn', () => {
            expect(urls(`${BASE}/nn/tilbakemeldinger`, 'nn')).toEqual([
                `${BASE}/nb`,
                `${BASE}/nn/tilbakemeldinger`,
            ]);
        });
    });

    describe('unknown segments', () => {
        test('should stop the trail rather than emit a translation key', () => {
            const crumbs = titles(
                `${BASE}/nb/tilbakemeldinger/garbage-123`,
                'nb'
            );

            expect(crumbs).toEqual(['Kontakt oss', 'Tilbakemelding']);
            expect(crumbs.some((t) => t.includes('breadcrumb.'))).toBe(false);
        });

        test('should not reflect markup from the path into a title', () => {
            const crumbs = titles(
                `${BASE}/nb/<img src=x onerror=alert(1)>`,
                'nb'
            );

            expect(crumbs).toEqual(['Kontakt oss']);
            expect(crumbs.join(' ')).not.toContain('<img');
        });

        test('should only strip the base path prefix, not a later occurrence', () => {
            expect(titles(`${BASE}/nb${BASE}/x`, 'nb')).toEqual([
                'Kontakt oss',
            ]);
        });
    });

    describe('translation coverage', () => {
        // The trail stops at the first untranslated segment, so a missing key
        // would silently truncate a real breadcrumb instead of showing itself.
        const routeSegments = [
            ...new Set(
                Object.values(paths.tilbakemeldinger)
                    .map((value) =>
                        typeof value === 'string' ? value : value.form
                    )
                    .flatMap((route) => route.split('/'))
                    .filter(Boolean)
            ),
        ];

        test('should have a breadcrumb translation for every route segment', () => {
            expect(routeSegments.length).toBeGreaterThan(0);

            for (const locale of validLocales) {
                for (const segment of routeSegments) {
                    const key = `breadcrumb.${segment}`;
                    expect(translate(locale, key)).not.toBe(key);
                }
                expect(translate(locale, 'breadcrumb.base')).not.toBe(
                    'breadcrumb.base'
                );
            }
        });
    });
});
