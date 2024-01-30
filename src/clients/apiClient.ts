import Environment from 'src/Environments';
import { BadRequest, HTTPError } from 'types/errors';
import { OutboundRosTilNav } from 'pages/tilbakemeldinger/ros-til-nav/Ros';
import { OutboundFeilOgMangler } from 'pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler';
import { OutboundServiceKlage } from 'pages/tilbakemeldinger/service-klage/ServiceKlage';

const { appUrl, personInfoApiUrl, authUrl } = Environment();

const API_URL = `${appUrl}/api`;

/*
    GET
 */

const hentJson = (url: string) =>
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        credentials: 'include',
    })
        .then((response) => sjekkForFeil(url, response))
        .then(parseJson)
        .catch((err: string & HTTPError) => {
            throw {
                code: err.code || 404,
                text: err.text || err,
            };
        });

export const fetchEnheter = () => hentJson(`${API_URL}/enheter`);

export const fetchFodselsnr = () => hentJson(`${API_URL}/fodselsnr`);

export const fetchAuthInfo = () => hentJson(`${authUrl}`);

export const fetchKontaktInfo = () =>
    hentJson(`${personInfoApiUrl}/kontaktinformasjon`);

/*
    POST
 */

type Outbound =
    | OutboundRosTilNav
    | OutboundFeilOgMangler
    | OutboundServiceKlage;

const sendJson = async (url: string, data: Outbound) => {
    console.log(url, data);
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        credentials: 'include',
    });
    const json = await res.json();
    if (res.ok) {
        return json;
    } else {
        throw json;
    }
};

export const postRosTilNav = (data: OutboundRosTilNav) =>
    sendJson(`${API_URL}/mottak/ros`, data);

export const postServiceKlage = (data: OutboundServiceKlage) =>
    sendJson(`${API_URL}/mottak/serviceklage`, data);

export const postFeilOgMangler = (data: OutboundFeilOgMangler) =>
    sendJson(`${API_URL}/mottak/feil-og-mangler`, data);

/*
    Utils
 */

const parseJson = (data: Response) => data.json();

const sjekkForFeil = async (url: string, response: Response) => {
    if (response.ok) {
        return response;
    } else {
        const error = {
            code: response.status,
            text:
                response.status === 400
                    ? await parseJson(response).then(
                          (data: BadRequest) => data.message
                      )
                    : response.statusText,
        };
        throw error;
    }
};
