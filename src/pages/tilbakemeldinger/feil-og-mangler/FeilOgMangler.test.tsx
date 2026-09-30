// @vitest-environment jsdom
import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';
import { renderApp, t } from '#test/render';

test('sends a feil og mangler report and thanks the user', async () => {
	const { user, posts } = renderApp('/nb/tilbakemeldinger/feil-og-mangler');

	await user.click(await screen.findByRole('radio', { name: t('felter.typefeil.tekniskfeil') }));
	await user.type(screen.getByRole('textbox', { name: t('felter.melding.tittel') }), 'Knappen virker ikke');
	await user.click(screen.getByRole('radio', { name: t('felter.onskerkontakt.ja') }));
	await user.type(await screen.findByRole('textbox', { name: t('felter.epost.tittel') }), 'ola@example.com');
	await user.click(screen.getByRole('button', { name: t('felter.send') }));

	expect(await screen.findByText(t('takk.melding'))).toBeInTheDocument();
	expect(posts).toEqual([
		{
			path: '/person/kontakt-oss/tilbakemeldinger/api/mottak/feil-og-mangler',
			body: {
				feiltype: 'TEKNISK_FEIL',
				onskerKontakt: true,
				epost: 'ola@example.com',
				melding: 'Knappen virker ikke',
			},
		},
	]);
});
