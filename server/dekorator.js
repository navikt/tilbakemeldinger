const jsdom = require("jsdom");
const request = require("request");
const NodeCache = require("node-cache");
const cache = new NodeCache();
const { JSDOM } = jsdom;

const getUrl = namespace => {
  if (namespace !== "prod") {
    return `https://appres-${namespace}.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true`;
  } else {
    return `https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true`;
  }
};

const getDecorator = namespace =>
  new Promise((resolve, reject) => {
    const cache = cache.get(namespace);
    if (cache) {
      resolve(cache);
    } else {
      request(getUrl(namespace), (error, response, body) => {
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
            ]
          };
          cache.set(namespace, data);
          resolve(data);
        } else {
          reject(new Error(error));
        }
      });
    }
  });

module.exports = getDecorator;
