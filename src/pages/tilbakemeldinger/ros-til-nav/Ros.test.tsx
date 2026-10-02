// @vitest-environment jsdom
import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';
import { renderApp, t } from '#test/render.tsx';

test('sends ros to a Nav-kontor picked in the combobox, by name', async () => {
	const { user, posts } = renderApp('/nb/tilbakemeldinger/ros-til-nav');

	await user.click(await screen.findByRole('radio', { name: t('felter.hvemroses.navkontor') }));
	await user.type(await screen.findByRole('combobox'), 'osl');
	await user.click(await screen.findByRole('option', { name: 'Nav Oslo' }));
	await user.type(screen.getByRole('textbox', { name: t('felter.melding.tittel') }), 'Veldig god hjelp');
	await user.click(screen.getByRole('button', { name: t('felter.send') }));

	expect(await screen.findByText(t('takk.melding'))).toBeInTheDocument();
	expect(posts).toEqual([
		{
			path: '/person/kontakt-oss/tilbakemeldinger/api/mottak/ros',
			body: { melding: 'Veldig god hjelp', hvemRoses: 'NAV_KONTOR', navKontor: 'Nav Oslo' },
		},
	]);
});
