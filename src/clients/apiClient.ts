import Environment from "../utils/Environments";
import { HTTPError } from "../components/error/Error";
import { logApiError } from "../utils/logger";
import { RosTilNav } from "../pages/ros-til-nav/Ros";
import { FeilOgMangler } from "../pages/feil-og-mangler/FeilOgMangler";

const { loginUrl, baseUrl, apiUrl } = Environment();
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

const sendJson = (url: string, data: RosTilNav) =>
  fetch(`${apiUrl}/ros-til-nav`, {
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

export const postRosTilNav = (data: RosTilNav) =>
  sendJson(`${apiUrl}/ros`, data);

export const postFeilOgMangler = (data: FeilOgMangler) =>
  sendJson(`${apiUrl}/feil-og-mangler`, data);
