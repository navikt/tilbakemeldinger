import { paths } from './paths.js';
import { validLocales } from './locale.js';

const escapeRegExp = (value: string) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Anchored, so only a real prefix is stripped, and the locale alternation comes
// from validLocales so adding a locale stays the one-line change it claims to be.
const BASE_PATH_PREFIX = new RegExp(
    `^${escapeRegExp(paths.kontaktOss.forside)}(?:/(?:${validLocales.join('|')}))?`
);

/**
 * Turns a full pathname into the route-relative path the app knows itself by:
 *
 *   /person/kontakt-oss/nb/tilbakemeldinger/serviceklage
 *     -> /tilbakemeldinger/serviceklage
 *
 * The keys in common/paths are written in this form, so both the server (which
 * only ever sees full pathnames) and the client can look things up with them.
 */
export const appPathFromPathname = (pathname: string) =>
    pathname.replace(BASE_PATH_PREFIX, '');
