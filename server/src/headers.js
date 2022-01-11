const fetch = require("node-fetch");

/*
  Set headers for proxy requests
 */

const setEnheterProxyHeaders = (proxyReq, req, res) => {
  proxyReq.setHeader(
    process.env.TILBAKEMELDINGER_API_ENHETERRS_APIKEY_USERNAME,
    process.env.TILBAKEMELDINGER_API_ENHETERRS_APIKEY_PASSWORD
  );
};

const setMottakProxyHeaders = (proxyReq, req, res) => {
  const userToken = req.cookies["selvbetjening-idtoken"];
  const stsToken = req.access_token;
  const authTokens = [];

  if (stsToken) {
    authTokens.push(`Bearer ${stsToken}`);
  }

  if (userToken) {
    authTokens.push(`Bearer ${userToken}`);
  }

  if (authTokens.length > 0) {
    proxyReq.setHeader("Authorization", authTokens.join());
  }

  proxyReq.setHeader(
    process.env.TILBAKEMELDINGER_API_TILBAKEMELDINGSMOTTAK_APIKEY_USERNAME,
    process.env.TILBAKEMELDINGER_API_TILBAKEMELDINGSMOTTAK_APIKEY_PASSWORD
  );

  Object.keys(req.headers).forEach((key) => {
    proxyReq.setHeader(key, req.headers[key]);
  });
};

const getStsToken = (context) => async (req, res, next) => {
  if (req.originalUrl.includes(context)) {
    const {
      TILBAKEMELDINGER_API_SECURITY_TOKEN_SERVICE_TOKEN_APIKEY_USERNAME,
      TILBAKEMELDINGER_API_SECURITY_TOKEN_SERVICE_TOKEN_APIKEY_PASSWORD,
    } = process.env;

    const STS_BASIC_AUTH = Buffer.from(
      `${process.env.SRVTILBAKEMELDINGER_API_USERNAME}:${process.env.SRVTILBAKEMELDINGER_API_PASSWORD}`
    ).toString("base64");

    const STS_HEADERS = {
      Authorization: `Basic ${STS_BASIC_AUTH}`,
      "Nav-Consumer-Id": "tilbakemeldinger-api",
      [TILBAKEMELDINGER_API_SECURITY_TOKEN_SERVICE_TOKEN_APIKEY_USERNAME]:
        TILBAKEMELDINGER_API_SECURITY_TOKEN_SERVICE_TOKEN_APIKEY_PASSWORD,
    };

    const STS_OPTIONS = {
      headers: STS_HEADERS,
    };

    const STS_URL = `${process.env.SECURITY_TOKEN_SERVICE_TOKEN_URL}?grant_type=client_credentials&scope=openid`;
    await fetch(STS_URL, STS_OPTIONS)
      .then((stsRes) => stsRes.json())
      .then((stsRes) => {
        req.access_token = stsRes.access_token;
        console.log(`Fetched sts token token! ${stsRes.access_token.slice(0, 10)}`)
        next();
      })
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
      });
  } else {
    console.log(`Did not fetch sts token: ${req.originalUrl}, ${context}`);
    next();
  }
};

module.exports = {
  setEnheterProxyHeaders,
  setMottakProxyHeaders,
  getStsToken,
};
