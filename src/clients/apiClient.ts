import Environment from "../utils/Environments";
import { HTTPError } from "../components/error/Error";
import { logApiError } from "../utils/logger";
import { OutboundRosTilNav } from "../pages/ros-til-nav/Ros";
import { OutboundFeilOgMangler } from "../pages/feil-og-mangler/FeilOgMangler";
import { OutboundServiceKlage } from "../pages/service-klage/ServiceKlage";

const { loginUrl, baseUrl, apiUrl, personInfoApiUrl } = Environment();
const parseJson = (data: any) => data.json();

export const sendTilLogin = () => {
  window.location.assign(`${loginUrl}?redirect=${window.location.href}`);
};

const sjekkForFeil = (url: string, response: Response) => {
  if (response.ok) {
    return response;
  } else {
    const error = {
      code: response.status,
      text: response.statusText
    };
    throw error;
  }
};

const hentJson = (url: string) =>
  fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
    credentials: "include"
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

const sendJson = (
  url: string,
  data: OutboundRosTilNav | OutboundFeilOgMangler | OutboundServiceKlage
) =>
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  })
    .then(response => sjekkForFeil(url, response))
    .then(parseJson)
    .catch((err: string & HTTPError) => {
      const error = {
        code: err.code || 404,
        text: err.text || err
      };
      logApiError(url, error);
      throw error;
    });

export const fetchAuthInfo = () =>
  hentJson(`${baseUrl}/innloggingslinje-api/auth`);

export const fetchFodselsnr = () => hentJson(`${apiUrl}/fodselsnr`);

export const fetchKontaktInfo = () =>
  hentJson(`${personInfoApiUrl}/kontaktinformasjon`);

export const postRosTilNav = (data: OutboundRosTilNav) =>
  sendJson(`${apiUrl}/ros`, data);

export const postServiceKlage = (data: OutboundServiceKlage) =>
  sendJson(`${apiUrl}/serviceklage`, data);

export const postFeilOgMangler = (data: OutboundFeilOgMangler) =>
  sendJson(`${apiUrl}/feil-og-mangler`, data);
