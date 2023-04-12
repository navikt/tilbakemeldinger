require("dotenv").config();
const express = require("express");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const logger = require("./logger");
const decodeJWT = require("jwt-decode");
const cookies = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const compression = require("compression");
const { getAuthorizationHeader } = require("./external/auth");
const { fetchErrorResponse } = require("./utils/fetch");
const fetch = require("node-fetch");

const server = express();
const buildPath = path.resolve(__dirname, "../../build");
const baseUrl = "/person/kontakt-oss/tilbakemeldinger";

// Parse application/json
server.use(compression());
server.use(baseUrl, express.static(buildPath, { index: false }));
server.use(cookies());
server.use(express.json());
server.get(`${baseUrl}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

server.get(`${baseUrl}/fodselsnr`, (req, res) =>
  res.send({ fodselsnr: decodeJWT(req.cookies["selvbetjening-idtoken"]).pid })
);

server.post(`${baseUrl}/mottak/:path`, async (req, res) => {
  const authorizationHeader = await getAuthorizationHeader();

  if (!authorizationHeader) {
    return fetchErrorResponse(500, "Failed to get authorization header");
  }

  console.log(JSON.stringify(req.body));
  console.log(req.body);

  const response = await fetch(`${process.env.API_URL}/${req.params.path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorizationHeader,
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    const error = await response.text();
    return res.status(response.status).send({ error });
  }

  const responseData = await response.json();
  res.status(response.status).send(responseData);
});

server.use(
  createProxyMiddleware([`${baseUrl}/enheter`], {
    target: process.env.NORG2_URL,
    pathRewrite: {
      [`^${baseUrl}/enheter`]: "/norg2/api/v1/enhet?enhetStatusListe=AKTIV",
    },
    changeOrigin: true,
  })
);

// Match everything except internal og static
server.use(/^(?!.*\/(internal|static)\/).*$/, (req, res) => {
  const devOrProd = req.headers.host.split(".")[1] === "dev" ? "dev" : "prod";
  const language = req.originalUrl.indexOf("/en") !== -1 ? "en" : "nb";
  getHtmlWithDecorator(`${buildPath}/index.html`, devOrProd, language)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => logger.info(`App listening on port: ${port}`));
