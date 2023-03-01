import Environment from "../Environments";
import { HTTPError } from "types/errors";
import { OutboundRosTilNav } from "pages/tilbakemeldinger/ros-til-nav/Ros";
import { OutboundFeilOgMangler } from "pages/tilbakemeldinger/feil-og-mangler/FeilOgMangler";
import { OutboundServiceKlage } from "pages/tilbakemeldinger/service-klage/ServiceKlage";
import { BadRequest } from "types/errors";

const { appUrl, personInfoApiUrl, authUrl } = Environment();

/*
    GET
 */

const hentJson = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include",
  })
    .then((response) => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err,
      };
      throw error;
    });

export const fetchEnheter = () => hentJson(`${appUrl}/enheter`);

export const fetchFodselsnr = () => hentJson(`${appUrl}/fodselsnr`);

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

const sendJson = (url: string, data: Outbound) => {
  console.log(url, data);
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include",
  })
    .then((response) => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err,
      };
      throw error;
    });
};

export const postRosTilNav = (data: OutboundRosTilNav) =>
  sendJson(`${appUrl}/mottak/ros`, data);

export const postServiceKlage = (data: OutboundServiceKlage) =>
  sendJson(`${appUrl}/mottak/serviceklage`, data);

export const postFeilOgMangler = (data: OutboundFeilOgMangler) =>
  sendJson(`${appUrl}/mottak/feil-og-mangler`, data);

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
          ? await parseJson(response).then((data: BadRequest) => data.message)
          : response.statusText,
    };
    throw error;
  }
};
