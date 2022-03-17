require("dotenv").config();
const express = require("express");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const logger = require("./logger");
const decodeJWT = require("jwt-decode");
const cookies = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const server = express();
const buildPath = path.resolve(__dirname, "../build");
const baseUrl = "/person/kontakt-oss/tilbakemeldinger";

// Parse application/json
server.use(express.json());
server.use(baseUrl, express.static(buildPath, { index: false }));
server.use(cookies());
server.get(`${baseUrl}/internal/isAlive|isReady`, (req, res) =>
  res.sendStatus(200)
);

server.get(`${baseUrl}/fodselsnr`, (req, res) =>
  res.send({ fodselsnr: decodeJWT(req.cookies["selvbetjening-idtoken"]).pid })
);

server.use(
  createProxyMiddleware([`**/mottak`, `**/enheter`], {
    target: process.env.API_URL,
    pathRewrite: { [`^/person/kontakt-oss`]: "" },
    onProxyReq: (proxyReq, req) => {
      console.log("Proxy truffet");
      proxyReq.setHeader(
        "Authorization",
        `Bearer ${req.cookies["selvbetjening-idtoken"]}`
      );
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
