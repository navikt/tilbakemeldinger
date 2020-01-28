const postnrTilEnhetsnrOgPoststed = require("./postnr-til-enhetsnr-og-poststed.json");
const stedsnavnTilEnhetsnr = require("./stedsnavn-til-enhetsnr.json");

export const minQueryLength = 2;

export enum SearchStatus {
  StedsnavnTreff,
  PostnrTreff,
  IngenTreff,
  QueryFeil,
  UgyldigPostnr,
  VisAlle
}

export type SearchHit = {
  enhetsnr: Array<number>,
  treffnavn: string,
  hitIndex: number
};

export type SearchResult = {
  hits: Array<SearchHit>,
  query: string,
  status: SearchStatus
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

const isValidPostnrFormat = (nr: string) => {
  const nrSanitized = nr
    .replace(".", "")
    .replace("-", "");
  return nr && nr.length === 4 && nr === nrSanitized && !isNaN(Number(nr));
};

const generateQueryFeilResult = (query: string) => {
  return {hits: [], query, status: SearchStatus.QueryFeil};
};

const generatePostnrHitResult = (query: string) => {
  if (!isValidPostnrFormat(query)) {
    return generateQueryFeilResult(query);
  }

  const nrUtenLedendeNull = parseInt(query, 10).toString();
  const postnrMapping = postnrTilEnhetsnrOgPoststed[nrUtenLedendeNull];
  return postnrMapping
    ? {hits: [{enhetsnr: [postnrMapping.enhetsnr], treffnavn: `${query} ${postnrMapping.poststed}`, hitIndex: 0}], query, status: SearchStatus.PostnrTreff}
    : {hits: [], query, status: SearchStatus.UgyldigPostnr};
};

const generateStedsnavnHitResult = (query: string) => {
  const stedQuery = sanitizeQuery(query);

  const hits = Object.keys(stedsnavnTilEnhetsnr)
    .reduce((acc: Array<SearchHit>, stedsnavn) => {
      const hitIndex = sanitizeQuery(stedsnavn).indexOf(stedQuery);
      return hitIndex > -1
        ? [...acc, {enhetsnr: stedsnavnTilEnhetsnr[stedsnavn], treffnavn: stedsnavn, hitIndex: hitIndex}] : acc;
      }, []);

  return {hits: hits, query, status: hits.length > 0 ? SearchStatus.StedsnavnTreff : SearchStatus.IngenTreff};
};

export const generateSearchResult = (query: string) => {
  if (query === ":visalle") {
    return {hits: [], query, status: SearchStatus.VisAlle};
  }

  if (!query || query.length < minQueryLength) {
    return generateQueryFeilResult(query);
  }

  if (!isNaN(Number(query))) {
    return generatePostnrHitResult(query);
  }

  return generateStedsnavnHitResult(query);
};
