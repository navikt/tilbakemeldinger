import { expect } from 'vitest';
import type { TestServer } from './harness';

// Schema-valid bodies, with padding and an unknown key to show that the raw
// body (not the zod-parsed one) is what gets forwarded upstream
export const ROS = { hvemRoses: 'NAV_KONTAKTSENTER', melding: '  Veldig bra hjelp  ', ukjentFelt: 'beholdes' };

export const FEIL_OG_MANGLER = {
	onskerKontakt: true,
	epost: 'test@example.com',
	feiltype: 'TEKNISK_FEIL',
	melding: 'Knappen virker ikke',
};

export const SERVICEKLAGE = {
	klagetekst: 'Dette er en klage på service',
	oenskerAaKontaktes: true,
	paaVegneAv: 'PRIVATPERSON',
	innmelder: { navn: 'Ola Nordmann', personnummer: '12345678901', telefonnummer: '99988777' },
};

export const unsignedJwt = (payload: Record<string, unknown>) =>
	[{ alg: 'none', typ: 'JWT' }, payload, 'signature']
		.map((part) => (typeof part === 'string' ? part : Buffer.from(JSON.stringify(part)).toString('base64url')))
		.join('.');

export const expectNoUnexpectedHosts = (server: TestServer) => {
	expect(server.stub.unexpected.map((r) => `${r.method} ${r.host}${r.path}`)).toEqual([]);
};
