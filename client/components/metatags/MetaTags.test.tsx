// @vitest-environment jsdom
import { waitFor } from '@testing-library/dom';
import { expect, test } from 'vitest';
import { renderApp } from '#test/render.tsx';
import nb from '#shared/language/nb.ts';
import en from '#shared/language/en.ts';

const PAGE = '/tilbakemeldinger/feil-og-mangler';
const ORIGIN = 'http://localhost:9001'; // APP_ORIGIN as pinned in vite.config.ts

const head = () => ({
	title: document.title,
	descriptions: [...document.head.querySelectorAll('meta[name="description"]')].map((m) => m.getAttribute('content')),
	canonicals: [...document.head.querySelectorAll('link[rel="canonical"]')].map((l) => l.getAttribute('href')),
});

// What the decorator sends when the user picks a language. jsdom's own
// postMessage leaves out source/origin, which the decorator client checks.
const selectLanguage = (locale: string) =>
	window.dispatchEvent(
		new MessageEvent('message', {
			data: { source: 'decorator', event: 'languageSelect', payload: { locale, url: '', handleInApp: true } },
			origin: window.location.origin,
			source: window,
		})
	);

test('keeps title, description and canonical in sync across a language switch, with one pageview per title', async () => {
	const { analytics } = renderApp(`/nb${PAGE}`);

	await waitFor(() =>
		expect(head()).toEqual({
			title: `${nb['tilbakemeldinger.feil-og-mangler.sidetittel']} - www.nav.no`,
			descriptions: [nb['seo.feil-og-mangler.description']],
			canonicals: [`${ORIGIN}/person/kontakt-oss/nb${PAGE}`],
		})
	);

	selectLanguage('en');

	await waitFor(() =>
		expect(head()).toEqual({
			title: `${en['tilbakemeldinger.feil-og-mangler.sidetittel']} - www.nav.no`,
			descriptions: [en['seo.feil-og-mangler.description']],
			canonicals: [`${ORIGIN}/person/kontakt-oss/en${PAGE}`],
		})
	);

	// The decorator client sends analytics asynchronously
	const pageviews = () => analytics.mock.calls.map(([event]) => event.eventData?.sidetittel).filter(Boolean);
	await waitFor(() =>
		expect(pageviews()).toEqual([
			nb['tilbakemeldinger.feil-og-mangler.sidetittel'],
			en['tilbakemeldinger.feil-og-mangler.sidetittel'],
		])
	);
});
