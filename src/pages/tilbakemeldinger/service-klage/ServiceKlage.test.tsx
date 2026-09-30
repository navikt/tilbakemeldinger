// @vitest-environment jsdom
import { screen, waitFor } from '@testing-library/dom';
import { expect, test } from 'vitest';
import { renderApp, t } from '#test/render';

test('a company must want contact, and gets the orgnr error back from the API', async () => {
	const { user, posts } = renderApp('/nb/tilbakemeldinger/serviceklage', {
		mottak: { status: 400, body: { errorCode: 'EREG_NOT_FOUND' } },
	});

	// Not logged in, so the login modal shows first
	await user.click(
		await screen.findByRole('button', { name: t('tilbakemeldinger.serviceklage.login.knapp.fortsettuten') })
	);

	await user.click(screen.getByRole('radio', { name: t('felter.hvemfra.virksomhet') }));
	await user.type(screen.getByRole('textbox', { name: t('felter.dinrolle.bedrift') }), 'Daglig leder');
	await user.type(screen.getByRole('textbox', { name: t('felter.orgnavn') }), 'Bedrift AS');
	await user.type(screen.getByRole('textbox', { name: t('felter.orgnr') }), '123456789');
	await user.type(await screen.findByRole('combobox'), 'berg');
	await user.click(await screen.findByRole('option', { name: 'Nav Bergen' }));
	await user.type(screen.getByRole('textbox', { name: t('felter.melding.tittel') }), 'Ble ikke hjulpet');
	await user.click(screen.getByRole('radio', { name: t('tilbakemeldinger.serviceklage.form.onskersvar.nei') }));
	await user.click(screen.getByRole('button', { name: t('felter.send') }));

	expect(await screen.findByText(t('validering.onskerkontakt.bedrift.pakrevd'))).toBeInTheDocument();
	expect(posts).toEqual([]);

	await user.click(screen.getByRole('radio', { name: t('tilbakemeldinger.serviceklage.form.onskersvar.ja') }));
	await user.type(await screen.findByRole('textbox', { name: t('felter.dittnavn') }), 'Kari Nordmann');
	await user.type(screen.getByRole('textbox', { name: t('felter.tlf.tittel') }), '99988777');
	const send = screen.getByRole('button', { name: t('felter.send') });
	await waitFor(() => expect(send).toBeEnabled());
	await user.click(send);

	expect(await screen.findByText(t('feilmelding.orgnr'))).toBeInTheDocument();
	expect(posts).toEqual([
		{
			path: '/person/kontakt-oss/tilbakemeldinger/api/mottak/serviceklage',
			body: {
				klagetekst: 'Ble ikke hjulpet',
				oenskerAaKontaktes: true,
				paaVegneAv: 'BEDRIFT',
				enhetsnummerPaaklaget: '4812',
				innmelder: { navn: 'Kari Nordmann', telefonnummer: '99988777', rolle: 'Daglig leder' },
				paaVegneAvBedrift: { navn: 'Bedrift AS', organisasjonsnummer: '123456789' },
			},
		},
	]);
});

test('a logged-in person gets name, fødselsnummer and phone prefilled', async () => {
	const { user, posts, settled } = renderApp('/nb/tilbakemeldinger/serviceklage', {
		auth: { body: { authenticated: true, name: 'Ola Nordmann', securityLevel: '4' } },
		fodselsnr: { body: { fodselsnr: '01019000083' } },
		kontaktinformasjon: { body: { mobiltelefonnummer: '+47 99988777' } },
	});
	await settled('fodselsnr', 'kontaktinformasjon');

	await user.click(await screen.findByRole('radio', { name: t('felter.hvemfra.megselv') }));
	expect(screen.getByRole('textbox', { name: t('felter.navn.tittel') })).toHaveValue('Ola Nordmann');
	expect(screen.getByRole('textbox', { name: t('felter.navn.tittel') })).toBeDisabled();
	expect(screen.getByRole('textbox', { name: t('felter.fodselsnr') })).toHaveValue('01019000083');
	expect(screen.getByRole('textbox', { name: t('felter.fodselsnr') })).toBeDisabled();

	await user.type(screen.getByRole('textbox', { name: t('felter.melding.tittel') }), 'Lang ventetid');
	await user.click(screen.getByRole('radio', { name: t('tilbakemeldinger.serviceklage.form.onskersvar.ja') }));
	expect(await screen.findByRole('textbox', { name: t('felter.tlf.tittel') })).toHaveValue('+47 99988777');
	await user.click(screen.getByRole('button', { name: t('felter.send') }));

	expect(await screen.findByText(t('takk.melding'))).toBeInTheDocument();
	expect(posts).toEqual([
		{
			path: '/person/kontakt-oss/tilbakemeldinger/api/mottak/serviceklage',
			body: {
				klagetekst: 'Lang ventetid',
				oenskerAaKontaktes: true,
				paaVegneAv: 'PRIVATPERSON',
				innmelder: { navn: 'Ola Nordmann', telefonnummer: '+47 99988777', personnummer: '01019000083' },
			},
		},
	]);
});
