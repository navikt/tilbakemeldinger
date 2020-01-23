const postnrTilEnhetsnr = require("./postnr-til-enhetsnr.json");
const stedsnavnTilEnhetsnr = require("./stedsnavn-til-enhetsnr.json");

const isValidPostnrFormat = (postnr: string) => {
  const postnrSanitized = postnr
    .replace(".", "")
    .replace("-", "");
  return postnr && postnr.length === 4 && postnr === postnrSanitized && !isNaN(Number(postnr));
};

export const sanitizeQuery = (query: string) => query
  .toLowerCase()
  .replace(/\. /g, ".")
  .replace(/[ /–]/g, "-")
  .replace(/,/g, "")
  .replace(/[áàâãä]/g, "a")
  .replace(/[ûùúü]/g, "u")
  .replace(/š/g, "s")
  .replace(/ŋ/g, "n");

export const generateSearchResult = (query: string, callback: Function) => {
  if (!query) {
    return;
  }

  if (isValidPostnrFormat(query)) {
    const postnrUtenLedendeNull = parseInt(query, 10).toString();
    const enhetsnr = postnrTilEnhetsnr[postnrUtenLedendeNull];
    if (enhetsnr) {
      callback([enhetsnr]);
    }
    return;
  }

  const stedQuery = sanitizeQuery(query);

  if (!stedQuery) {
    return;
  }

  const result = Object.keys(stedsnavnTilEnhetsnr)
    .filter(stedsnavn => (stedsnavn.includes(stedQuery)))
    .reduce((acc: Array<number>, stedsnavn) => ([...acc, ...stedsnavnTilEnhetsnr[stedsnavn]]), [])
    .reduce((acc: Array<number>, enhetsnr) => (acc.includes(enhetsnr) ? acc : [...acc, enhetsnr]), []);
  callback(result);
};
