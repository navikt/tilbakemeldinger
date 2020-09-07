const jsdom = require("jsdom");
const request = require("request");
const NodeCache = require("node-cache");
const logger = require("./logger");
const { JSDOM } = jsdom;

const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;

// Refresh cache every hour
const cache = new NodeCache({
  stdTTL: SECONDS_PER_HOUR,
  checkperiod: SECONDS_PER_MINUTE,
});

const getUrl = (namespace, language) => {
  if (namespace !== "p") {
    // Q0, Q1, Q6 etc ..
    return `https://www-${namespace}.nav.no/dekoratoren/?language=${language}&chatbot=true&availableLanguages=[{"locale":"nb","url":"https://www-${namespace}.nav.no/person/kontakt-oss/nb/"},{"locale":"en","url":"https://www-${namespace}.nav.no/person/kontakt-oss/en/"}]`;
  } else {
    // Produksjon
    return `https://www.nav.no/dekoratoren/?language=${language}&chatbot=true`;
  }
};

const getDecorator = (namespace, language) =>
  new Promise((resolve, reject) => {
    const decorator = cache.get(`${namespace}-${language}`);
    if (decorator) {
      resolve(decorator);
    } else {
      request(getUrl(namespace, language), (error, response, body) => {
        if (!error && response.statusCode >= 200 && response.statusCode < 400) {
          const { document } = new JSDOM(body).window;
          const prop = "innerHTML";
          const data = {
            NAV_SKIPLINKS: document.getElementById("skiplinks")[prop],
            NAV_SCRIPTS: document.getElementById("scripts")[prop],
            NAV_STYLES: document.getElementById("styles")[prop],
            NAV_HEADING: document.getElementById("header-withmenu")[prop],
            NAV_FOOTER: document.getElementById("footer-withmenu")[prop],
            MEGAMENU_RESOURCES: document.getElementById("megamenu-resources")[
              prop
            ],
          };
          cache.set(`${namespace}-${language}`, data);
          logger.info(`${namespace}-${language}: Creating cache`);
          resolve(data);
        } else {
          reject(new Error(error));
        }
      });
    }
  });

module.exports = getDecorator;
