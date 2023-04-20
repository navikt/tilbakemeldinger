import { Request, Response } from "express";
import { getTokenxToken } from "./auth/tokenx";

require("dotenv").config();
const express = require("express");
const path = require("path");
const getHtmlWithDecorator = require("./dekorator");
const logger = require("./logger");
const decodeJWT = require("jwt-decode");
const cookies = require("cookie-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");
const compression = require("compression");
const { getAzureadToken } = require("./auth/azuread");
const fetch = require("node-fetch");

const server = express();
const buildPath = path.resolve(__dirname, "../../build");
const baseUrl = "/person/kontakt-oss/tilbakemeldinger";
const validPaths = ["ros", "serviceklage", "feil-og-mangler"];

const getAccessToken = async (req: Request) => {
  const selvbetjeningIdToken = req.cookies["selvbetjening-idtoken"];

  if (req.params.path === "serviceklage" && selvbetjeningIdToken) {
    try {
      return await getTokenxToken(
        selvbetjeningIdToken,
        `${process.env.ENV}-gcp:teamserviceklage:tilbakemeldingsmottak-api`
      );
    } catch (e) {
      console.log(
        "Failed to fetch tokenx token, fetching Azure AD token as fallback"
      );
    }
  }

  return await getAzureadToken(
    `api://${process.env.ENV}-gcp.teamserviceklage.tilbakemeldingsmottak-api/.default`
  );
};

// Parse application/json
server.use(compression());
server.use(baseUrl, express.static(buildPath, { index: false }));
server.use(cookies());
server.use(express.json());
server.get(
  `${baseUrl}/internal/isAlive|isReady`,
  (req: Request, res: Response) => res.sendStatus(200)
);

server.get(`${baseUrl}/fodselsnr`, (req: Request, res: Response) =>
  res.send({ fodselsnr: decodeJWT(req.cookies["selvbetjening-idtoken"]).pid })
);

server.post(`${baseUrl}/mottak/:path`, async (req: Request, res: Response) => {
  const path = req.params.path;

  if (!validPaths.includes(path)) {
    return res.status(500).send("Invalid path");
  }

  const accessToken = await getAccessToken(req);

  if (!accessToken) {
    return res.status(500).send("Failed to populate auth header");
  }

  const response = await fetch(`${process.env.API_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(req.body),
  });

  if (!response.ok) {
    const error = await response.text();
    console.log(`Feil i kall til tilbakemeldingsmottak-api: ${error}`);
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
server.use(/^(?!.*\/(internal|static)\/).*$/, (req: Request, res: Response) => {
  const devOrProd = req.headers.host?.split(".")[1] === "dev" ? "dev" : "prod";
  const language = req.originalUrl.indexOf("/en") !== -1 ? "en" : "nb";
  getHtmlWithDecorator(`${buildPath}/index.html`, devOrProd, language)
    .then((html: any) => {
      res.send(html);
    })
    .catch((e: any) => {
      logger.error(e);
      res.status(500).send(e);
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => logger.info(`App listening on port: ${port}`));
