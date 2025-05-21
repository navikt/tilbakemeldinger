import Environment from 'src/Environments';
import { BadRequest, HTTPError } from 'types/errors';
import { RosTilNav } from 'common/types/RosTilNav';
import { FeilOgMangler } from 'common/types/FeilOgMangler';
import { ServiceKlage } from 'common/types/ServiceKlage';

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

type Payload = RosTilNav | FeilOgMangler | ServiceKlage;

const sendJson = async (url: string, data: Payload) => {
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

export const postRosTilNav = (data: RosTilNav) =>
    sendJson(`${API_URL}/mottak/ros`, data);

export const postServiceKlage = (data: ServiceKlage) =>
    sendJson(`${API_URL}/mottak/serviceklage`, data);

export const postFeilOgMangler = (data: FeilOgMangler) =>
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
