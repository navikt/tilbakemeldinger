const postnrTilEnhetsnrOgPoststed = require("./postnr-til-enhetsnr-og-poststed.json");
const stedsnavnTilEnhetsnr = require("./stedsnavn-til-enhetsnr.json");
const enhetsnrTilKontor = require("./enhetsnr-til-enhetsnavn.json");

const stedsnavnArray = Object.keys(stedsnavnTilEnhetsnr);
const norskSort = new Intl.Collator(["no", "nb", "nn"], {usage: "sort"}).compare;

export const minQueryLength = 2;

export enum SearchStatus {
  StedsnavnTreff,
  PostnrTreff,
  IngenTreff,
  QueryFeil,
  UgyldigPostnr
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

const sortByRelevance = (hits: Array<SearchHit>) => {
  const topHits = hits.filter(hit => hit.hitIndex === 0)
    .sort((a, b) => norskSort(a.treffnavn, b.treffnavn))
    .sort((a, b) => a.treffnavn.length - b.treffnavn.length);
  const rest = hits.filter(hit => hit.hitIndex !== 0)
    .sort((a, b) => norskSort(a.treffnavn, b.treffnavn));

  return [...topHits, ...rest];
};

const sorterEnheterPaaKontornavn = (enhetsnrArray: Array<number>) => enhetsnrArray
  .filter(enhetsnr => {
    const kontorNavn = enhetsnrTilKontor[enhetsnr];
    if (kontorNavn) {
      return true;
    }
    console.log("Error: kontornavn ikke funnet for enhetsnr " + enhetsnr);
    return false;
  })
  .sort((a, b) => norskSort(enhetsnrTilKontor[a], enhetsnrTilKontor[b]))
  .reduce((acc: Array<number>, curr, index, arr) =>
    (index > 0 && enhetsnrTilKontor[arr[index - 1]] === enhetsnrTilKontor[arr[index]] ? acc : [...acc, curr]), []);

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
    ? {
      hits: [{enhetsnr: [postnrMapping.enhetsnr], treffnavn: `${query} ${postnrMapping.poststed}`, hitIndex: 0}],
      query,
      status: SearchStatus.PostnrTreff
    }
    : {hits: [], query, status: SearchStatus.UgyldigPostnr};
};

const generateStedsnavnHitResult = (query: string) => {
  const stedQuery = sanitizeQuery(query);

  const hits = stedsnavnArray
    .reduce((acc: Array<SearchHit>, stedsnavn) => {
      const hitIndex = sanitizeQuery(stedsnavn).indexOf(stedQuery);
      const enheterSorted = sorterEnheterPaaKontornavn(stedsnavnTilEnhetsnr[stedsnavn]);
      return hitIndex > -1
        ? [...acc, {enhetsnr: enheterSorted, treffnavn: stedsnavn, hitIndex: hitIndex}] : acc;
    }, []);

  return {hits: sortByRelevance(hits), query, status: hits.length > 0 ? SearchStatus.StedsnavnTreff : SearchStatus.IngenTreff};
};

export const generateSearchResult = (query: string) => {
  if (query === ":visalle") {
    return {
      hits: [{enhetsnr: sorterEnheterPaaKontornavn(Object.keys(enhetsnrTilKontor).map(Number)),
        treffnavn: "Alle kontorer", hitIndex: 0}],
      query: "Alle kontorer", status: SearchStatus.StedsnavnTreff
    };
  }

  if (!query || query.length < minQueryLength) {
    return generateQueryFeilResult(query);
  }

  if (!isNaN(Number(query))) {
    return generatePostnrHitResult(query);
  }

  return generateStedsnavnHitResult(query);
};
