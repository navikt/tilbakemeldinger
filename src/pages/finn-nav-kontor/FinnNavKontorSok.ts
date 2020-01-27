const postnrTilEnhetsnr = require("./postnr-til-enhetsnr.json");
const stedsnavnTilEnhetsnr = require("./stedsnavn-til-enhetsnr.json");

export const minQueryLength = 2;

export enum SearchStatus {
  stedsnavnTreff,
  postnrTreff,
  ingenTreff,
  queryFeil,
  ugyldigPostnr,
  visAlle
}

export type SearchHit = {
  enhetsnr: Array<number>,
  stedsnavn: string,
  hitIndex: number
};

export type SearchResult = {
  hits: Array<SearchHit>,
  query: string,
  status: SearchStatus
};

const isValidPostnrFormat = (nr: string) => {
  const nrSanitized = nr
    .replace(".", "")
    .replace("-", "");
  return nr && nr.length === 4 && nr === nrSanitized && !isNaN(Number(nr));
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

const generateQueryFeilResult = (query: string) => {
  return {hits: [], query, status: SearchStatus.queryFeil};
};

const generatePostnrHitResult = (query: string) => {
  if (!isValidPostnrFormat(query)) {
    return generateQueryFeilResult(query);
  }

  const nrUtenLedendeNull = parseInt(query, 10).toString();
  const enhetsnr = postnrTilEnhetsnr[nrUtenLedendeNull];
  return enhetsnr
    ? {hits: [{enhetsnr: [enhetsnr], stedsnavn: query, hitIndex: 0}], query, status: SearchStatus.postnrTreff}
    : {hits: [], query, status: SearchStatus.ugyldigPostnr};
};

const generateStedsnavnHitResult = (query: string) => {
  const stedQuery = sanitizeQuery(query);

  const hits = Object.keys(stedsnavnTilEnhetsnr)
    .reduce((acc: Array<SearchHit>, stedsnavn) => {
      const hitIndex = sanitizeQuery(stedsnavn).indexOf(stedQuery);
      return hitIndex > -1
        ? [...acc, {enhetsnr: stedsnavnTilEnhetsnr[stedsnavn], stedsnavn: stedsnavn, hitIndex: hitIndex}] : acc;
      }, []);
    // .reduce((acc: Array<SearchHit>, enhetsnr) => (acc.includes(enhetsnr) ? acc : [...acc, enhetsnr]), []);

  return {hits: hits, query, status: hits.length > 0 ? SearchStatus.stedsnavnTreff : SearchStatus.ingenTreff};
};

export const generateSearchResult = (query: string) => {
  if (query === ":visalle") {
    return generateQueryFeilResult(query);
  }

  if (!query || query.length < minQueryLength) {
    return generateQueryFeilResult(query);
  }

  if (!isNaN(Number(query))) {
    return generatePostnrHitResult(query);
  }

  return generateStedsnavnHitResult(query);
};
