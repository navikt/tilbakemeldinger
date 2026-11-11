// @vitest-environment jsdom
import { screen } from '@testing-library/dom';
import { expect, test } from 'vitest';
import { ENHETER, renderApp, t } from '#test/render.tsx';

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

test('offers to try again when the list of Nav-kontorer fails to load', async () => {
	const { user } = renderApp('/nb/tilbakemeldinger/ros-til-nav', {
		enheter: [{ status: 500, body: 'Lasting av enheter feilet' }, { body: ENHETER }],
	});

	await user.click(await screen.findByRole('radio', { name: t('felter.hvemroses.navkontor') }));
	expect(await screen.findByText(t('felter.navkontor.lastefeil'))).toBeInTheDocument();
	expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

	await user.click(screen.getByRole('button', { name: t('felter.navkontor.provigjen') }));
	await user.type(await screen.findByRole('combobox'), 'osl');

	expect(await screen.findByRole('option', { name: 'Nav Oslo' })).toBeInTheDocument();
});
