const postnrTilEnhetsnr = require("./postnr-til-enhetsnr.json");
const stedsnavnTilEnhetsnr = require("./stedsnavn-til-enhetsnr.json");

export const minQueryLength = 2;

export enum SearchStatus {
  OK,
  ingenTreff,
  queryFeil,
  ugyldigPostnr,
  visAlle
}

export type SearchResult = {
  hits: Array<string>,
  query: string,
  status: SearchStatus
}

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

export const generateSearchResult = (query: string) => {
  if (query === ":visalle") {
    return {hits: [], query, status: SearchStatus.visAlle};
  }

  if (!query || query.length < minQueryLength) {
    return {hits: [], query, status: SearchStatus.queryFeil};
  }

  if (!isNaN(Number(query))) {
    if (!isValidPostnrFormat(query)) {
      return {hits: [], query, status: SearchStatus.queryFeil};
    }

    const nrUtenLedendeNull = parseInt(query, 10).toString();
    const enhetsnr = postnrTilEnhetsnr[nrUtenLedendeNull];
    return enhetsnr
      ? {hits: [enhetsnr], query, status: SearchStatus.OK}
      : {hits: [], query, status: SearchStatus.ugyldigPostnr};
  }

  const stedQuery = sanitizeQuery(query);

  if (!stedQuery) {
    return {hits: [], query, status: SearchStatus.queryFeil};
  }

  const hits = Object.keys(stedsnavnTilEnhetsnr)
    .filter(stedsnavn => (stedsnavn.includes(stedQuery)))
    .reduce((acc: Array<string>, stedsnavn) => ([...acc, ...stedsnavnTilEnhetsnr[stedsnavn]]), [])
    .reduce((acc: Array<string>, enhetsnr) => (acc.includes(enhetsnr) ? acc : [...acc, enhetsnr]), []);
  return {hits: hits, query, status: hits.length > 0 ? SearchStatus.OK : SearchStatus.ingenTreff};
};
