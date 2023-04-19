const { fetchJson, objectToQueryString } = require("../utils/fetch");
const Cache = require("node-cache");

const cacheKey = "authHeader";

const cache = new Cache({
  deleteOnExpire: true,
});

const azureAdTokenApi = `https://login.microsoftonline.com/${process.env.AZURE_APP_TENANT_ID}/oauth2/v2.0/token`;

type TokenResponse = {
  token_type: "Bearer";
  expires_in: number;
  access_token: string;
};

const fetchAccessToken = async (
  audience: string
): Promise<TokenResponse | null> => {
  console.log("Refreshing access token...");

  console.log(`api://${audience}/.default`);

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
        scope: `api://${audience}/.default`,
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

export const getAzureadToken = async (audience: string) => {
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  const accessToken = await fetchAccessToken(audience);
  if (!accessToken) {
    return null;
  }

  cache.set(accessToken.access_token);

  return accessToken.access_token;
};
