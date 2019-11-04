const jsdom = require("jsdom");
const request = require("request");
const { JSDOM } = jsdom;

const getUrl = subdomain => {
  if (subdomain !== "www") {
    const namespace = subdomain.split("-")[1];
    return `https://www-${namespace}.nav.no/person/nav-dekoratoren/`;
  } else {
    return "https://appres.nav.no/common-html/v4/navno?header-withmenu=true&styles=true&scripts=true&footer-withmenu=true&skiplinks=true&megamenu-resources=true";
  }
};

const getDecorator = subdomain =>
  new Promise((resolve, reject) => {
    request(getUrl(subdomain), (error, response, body) => {
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
        resolve(data);
      } else {
        reject(new Error(error));
      }
    });
  });

module.exports = getDecorator;
