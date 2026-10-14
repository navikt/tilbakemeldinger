// @vitest-environment jsdom
import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';
import { renderApp } from '#test/render.tsx';
import nb from '#shared/language/nb.ts';
import en from '#shared/language/en.ts';

// What the decorator sends when the user picks a language. jsdom's own
// postMessage leaves out source/origin, which the decorator client checks.
const selectLanguage = (locale: string) =>
	window.dispatchEvent(
		new MessageEvent('message', {
			data: { source: 'decorator', event: 'languageSelect', payload: { locale, handleInApp: true } },
			origin: window.location.origin,
			source: window,
		})
	);

test('a language switch keeps what the user typed, and back switches back', async () => {
	const { user } = renderApp('/nb/tilbakemeldinger/feil-og-mangler');
	await user.type(await screen.findByRole('textbox', { name: nb['felter.melding.tittel'] }), 'Knappen virker ikke');

	selectLanguage('en');

	expect(await screen.findByRole('textbox', { name: en['felter.melding.tittel'] })).toHaveValue('Knappen virker ikke');
	expect(window.location.pathname).toBe('/person/kontakt-oss/en/tilbakemeldinger/feil-og-mangler');

	window.history.back();

	expect(await screen.findByRole('textbox', { name: nb['felter.melding.tittel'] })).toHaveValue('Knappen virker ikke');
	expect(window.location.pathname).toBe('/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler');
});
