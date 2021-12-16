require("console-stamp")(console, "[HH:MM:ss.l]");
require("dotenv").config();

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cookies = require("cookie-parser");
const path = require("path");
const decodeJWT = require("jwt-decode");
const getHtmlWithDecorator = require("./dekorator");
const logger = require("./logger");
const {
  setEnheterProxyHeaders,
  setMottakProxyHeaders,
  getStsToken,
} = require("./headers");

const app = express();
const appPort = 8080;

const buildDir = path.resolve(__dirname, "../../build");
const basePath = "/person/kontakt-oss/tilbakemeldinger";

// Middleware
app.use(express.json());
app.use(cookies());
app.use(basePath, express.static(buildDir, { index: false }));

// liveness/readiness for kubernetes/nais
app.get(`${basePath}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

// Get fødselsnr from idtoken cookie
app.get(`${basePath}/api/fodselsnr`, (req, res) =>
  res.send({ fodselsnr: decodeJWT(req.cookies["selvbetjening-idtoken"]).sub })
);

// Proxy requests to oppdaterenhetsinfo
app.use(
  createProxyMiddleware(`${basePath}/api/enheter`, {
    target: process.env.ENHETERRS_URL,
    pathRewrite: { [`^${basePath}/api/enheter`]: "" },
    onProxyReq: setEnheterProxyHeaders,
    changeOrigin: true,
  })
);

// Proxy requests to tilbakemeldingsmottak-api
app.use(
  getStsToken(`${basePath}/api/mottak`),
  createProxyMiddleware(`${basePath}/api/mottak`, {
    target: process.env.TILBAKEMELDINGSMOTTAK_URL,
    pathRewrite: { [`^${basePath}/api/mottak`]: "" },
    onProxyReq: setMottakProxyHeaders,
    changeOrigin: true,
  })
);

// Serve the html-template to frontend for all other requests
app.use("*", (req, res) => {
  const devOrProd = req.headers.host.split(".")[1] === "dev" ? "dev" : "prod";
  const language = req.originalUrl.indexOf("/en") !== -1 ? "en" : "nb";
  getHtmlWithDecorator(`${buildDir}/index.html`, devOrProd, language)
    .then((html) => {
      res.send(html);
    })
    .catch((e) => {
      logger.error(e);
      res.status(500).send(e);
    });
});

app.listen(appPort, () => {
  logger.info(`App listening on port: ${appPort}`);
});
