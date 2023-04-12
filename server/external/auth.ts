const { fetchJson, objectToQueryString } = require("../utils/fetch");
const Cache = require("node-cache");

const cacheKey = "authHeader";

const cache = new Cache({
  deleteOnExpire: true,
});

const azureAdTokenApi = `https://login.microsoftonline.com/${process.env.AZURE_APP_TENANT_ID}/oauth2/v2.0/token`;

const encodeBase64 = (str: string) => Buffer.from(str).toString("base64");

type TokenResponse = {
  token_type: "Bearer";
  expires_in: number;
  access_token: string;
};

const fetchAccessToken = async (): Promise<TokenResponse | null> => {
  console.log("Refreshing access token...");

  const response = await fetchJson(azureAdTokenApi, undefined, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: objectToQueryString(
      {
        grant_type: "client_credentials",
        client_id: process.env.AZURE_APP_CLIENT_ID,
        client_secret: process.env.AZURE_APP_CLIENT_SECRET,
        scope: `api://dev-gcp.teamserviceklage.tilbakemeldingsmottak-api/.default`,
      },
      ""
    ),
  });

  if (!response.access_token) {
    console.error("Bad response from token service", response);
    return null;
  }

  return response;
};

export const getAuthorizationHeader = async () => {
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const accessToken = await fetchAccessToken();
  if (!accessToken) {
    return null;
  }

  const b64BearerToken = `Bearer ${encodeBase64(accessToken.access_token)}`;

  cache.set(cacheKey, b64BearerToken, accessToken.expires_in - 60);

  return b64BearerToken;
};
