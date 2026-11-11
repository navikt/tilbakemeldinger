import { corgi } from '@itsy/corgi';
import Environment from '#client/Environments.ts';
import type { AuthInfo } from '#client/types/authInfo.ts';
import type { Enhet } from '#client/types/enheter.ts';
import type { Fodselsnr } from '#client/types/fodselsnr.ts';
import type { KontaktInfo } from '#client/types/kontaktInfo.ts';
import type { RosTilNav } from '#shared/types/RosTilNav.ts';
import type { FeilOgMangler } from '#shared/types/FeilOgMangler.ts';
import type { ServiceKlage } from '#shared/types/ServiceKlage.ts';

const { appUrl, personInfoApiUrl, authUrl } = Environment();

const api = corgi.create({
	baseURL: `${appUrl}/api`,
	headers: { 'Content-Type': 'application/json;charset=UTF-8' },
	credentials: 'include',
});

export const fetchEnheter = () => api.get<Enhet[]>('/enheter');

export const fetchFodselsnr = () => api.get<Fodselsnr>('/fodselsnr');

export const fetchAuthInfo = () => api.get<AuthInfo>(authUrl);

export const fetchKontaktInfo = () => api.get<KontaktInfo>(`${personInfoApiUrl}/kontaktinformasjon`);

export const postRosTilNav = (data: RosTilNav) => api.post('/mottak/ros', { body: data });

export const postServiceKlage = (data: ServiceKlage) => api.post('/mottak/serviceklage', { body: data });

export const postFeilOgMangler = (data: FeilOgMangler) => api.post('/mottak/feil-og-mangler', { body: data });
