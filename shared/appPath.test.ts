import { describe, expect, test } from 'vitest';
import { appPath, getLocaleFromUrl, parseAppPath } from './appPath.ts';

const B = '/person/kontakt-oss';

describe('parseAppPath', () => {
	test.each([
		[`${B}/nb`, 'nb', '/'],
		[`${B}/nb/`, 'nb', '/'],
		[`${B}/nb/tilbakemeldinger`, 'nb', '/tilbakemeldinger'],
		[`${B}/nb/tilbakemeldinger/`, 'nb', '/tilbakemeldinger'],
		[`//person/kontakt-oss//NB//Tilbakemeldinger/x/?q=1#h`, 'nb', '/tilbakemeldinger/x'],
		[`${B}/en/tilbakemeldinger#h`, 'en', '/tilbakemeldinger'],
		[`${B}/xx/a`, undefined, '/xx/a'],
		[`/foo/nb/x`, undefined, '/foo/nb/x'],
	])('%s', (url, locale, page) => {
		expect(parseAppPath(url)).toMatchObject({ locale, page });
	});
});

test('getLocaleFromUrl falls back to the default locale', () => {
	expect(getLocaleFromUrl(`${B}/nn/x`)).toBe('nn');
	expect(getLocaleFromUrl(`${B}/xx/x`)).toBe('nb');
	expect(getLocaleFromUrl('/')).toBe('nb');
});

test('appPath', () => {
	expect(appPath('nb')).toBe(`${B}/nb`);
	expect(appPath('en', '/')).toBe(`${B}/en`);
	expect(appPath('en', '/tilbakemeldinger/x')).toBe(`${B}/en/tilbakemeldinger/x`);
});
