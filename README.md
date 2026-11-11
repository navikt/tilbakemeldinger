# Tilbakemeldinger

[![Deploy til prod](https://github.com/navikt/tilbakemeldinger/actions/workflows/deploy.prod.yml/badge.svg)](https://github.com/navikt/tilbakemeldinger/actions/workflows/deploy.prod.yml) [![Deploy til dev](https://github.com/navikt/tilbakemeldinger/actions/workflows/deploy.dev.yml/badge.svg)](https://github.com/navikt/tilbakemeldinger/actions/workflows/deploy.dev.yml) [![Oppdater base image](https://github.com/navikt/tilbakemeldinger/actions/workflows/base-image-refresh.yml/badge.svg)](https://github.com/navikt/tilbakemeldinger/actions/workflows/base-image-refresh.yml)

Frackend for innsending av tilbakemeldinger til NAV: Klage, ros og tekniske feil og mangler.

## Arkitektur

Applikasjonen er en full-stack Node.js-løsning med server-side rendering (SSR) og klient-side hydrering.

### Teknisk stack

- **Frontend**: React 19
- **Backend**: Hono på Node 26. Vite bygger serveren sammen med alle avhengighetene, så imaget har ingen `node_modules`
- **Språk**: TypeScript
- **Byggverktøy**: Vite

### Struktur

- `client/` - Frontend-kode (React-komponenter, utilities, entry points)
- `server/` - Backend-kode (Hono-server, API-ruter, SSR). Serveren skriver hele HTML-dokumentet (`server/site/page.ts`): appen rendret på serveren, dekoratøren, og script og stiler fra Vite-manifestet. På NAIS lastes script og stiler fra CDN-et (`CDN_BASE`). Med `pnpm dev` serverer Vite dem.
- `server/dev/` - Mocks for `pnpm dev` (`server/dev/mocks.ts`): dekoratørens innloggingsstatus, kontaktinformasjon, fødselsnummer, norg2 og tilbakemeldingsmottak-api
- `shared/` - Delt kode mellom frontend og backend (lokalisering, skjemaer, typer)
- `test/` - Testoppsett, og testene av serveren i prosess (`test/server`). `pnpm test` kjører testene i `client/`, `shared/`, `server/` og `test/server/`. `test/dist-smoke.ts` kjører bygget (`pnpm test:dist`)
- `dist/` - Bygget klient (`dist/client`) og server (`dist/server`): `prod-server.js` er serveren, og `main-server.js` er appen rendret på serveren, som `server/site/page.ts` laster ved oppstart

### Bygg og SBOM

Serverbygget pakker inn alle avhengighetene, så imaget har bare `dist/server`, manifestet til klientbygget, `package.json` og `.env`, uten `node_modules`. Derfor lager CI SBOM-en fra `pnpm-lock.yaml` (`sbom-from-lockfile` i navno-ci) i stedet for fra imaget. Det som havner i bygget, hører hjemme i `dependencies`, ikke i `devDependencies`.

### Konfigurasjon

Serveren leser konfigurasjonen når den starter: fra `env` i `.nais/config.yml` i podden, med verdiene per miljø i `.nais/vars-*.yml`, og fra `.env.development` lokalt. Det nettleseren trenger å vite om miljøet, skriver serveren inn i hver side (`server/site/page.ts`), så det ikke bakes inn i bygget. Bare `VITE_APP_BASEPATH` og `CDN_BASE` bakes inn; arbeidsflytene setter dem i `env-file`.

### Endepunkter

#### API-endepunkter

Under `/person/kontakt-oss/tilbakemeldinger/api`. `/mottak/*` validerer innsendingen og videresender den til [tilbakemeldingsmottak-api](https://github.com/navikt/tilbakemeldingsmottak-api).

| Endepunkt               | Metode | Beskrivelse                                                                   |
| ----------------------- | ------ | ----------------------------------------------------------------------------- |
| /mottak/serviceklage    | POST   | Serviceklage. [Typedefinisjon](shared/types/ServiceKlage.ts) for payload.     |
| /mottak/feil-og-mangler | POST   | Feil og mangler. [Typedefinisjon](shared/types/FeilOgMangler.ts) for payload. |
| /mottak/ros             | POST   | Ros til Nav. [Typedefinisjon](shared/types/RosTilNav.ts) for payload.         |
| /fodselsnr              | GET    | Fødselsnummeret fra brukerens token                                           |
| /enheter                | GET    | Aktive Nav-enheter fra norg2, til nedtrekkslisten                             |

### Side-endepunkter

| Endepunkt                              | Språk             | Beskrivelse                         |
| -------------------------------------- | ----------------- | ----------------------------------- |
| `/nb/tilbakemeldinger/serviceklage`    | Norsk bokmål (nb) | Skjema for serviceklage             |
| `/nn/tilbakemeldinger/serviceklage`    | Nynorsk (nn)      | Skjema for serviceklage             |
| `/en/tilbakemeldinger/serviceklage`    | English (en)      | Service complaint form              |
| `/nb/tilbakemeldinger/feil-og-mangler` | Norsk bokmål (nb) | Skjema for tekniske feil og mangler |
| `/nn/tilbakemeldinger/feil-og-mangler` | Nynorsk (nn)      | Skjema for tekniske feil og mangler |
| `/en/tilbakemeldinger/feil-og-mangler` | English (en)      | Technical issues and bugs form      |
| `/nb/tilbakemeldinger/ros-til-nav`     | Norsk bokmål (nb) | Skjema for ros til NAV              |
| `/nn/tilbakemeldinger/ros-til-nav`     | Nynorsk (nn)      | Skjema for ros til NAV              |
| `/en/tilbakemeldinger/ros-til-nav`     | English (en)      | Compliments to NAV form             |

### Metrikker

Nais henter metrikker fra `/internal/metrics` direkte fra poden (se `.nais/config.yml`). Endepunktet ligger utenfor base path, så det er ikke tilgjengelig via ingress.

| Metrikk                              | Labels                                                                                                                                                                       | Beskrivelse                                                                                                                                                                                                |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tilbakemeldinger_submissions_total` | `type` (`serviceklage`, `feil-og-mangler`, `ros`), `result` (`success`, `failure`), `reason` (`none`, `validation`, `rate_limit`, `auth`, `upstream`, `internal`, `unknown`) | Innsendte tilbakemeldinger. `success` når tilbakemeldingsmottak-api tok imot (2xx). Valideringsfeil, rate limiting og feil fra API-et er `failure`. `reason` forklarer feilen, og er `none` ved `success`. |

## Ingress i dev

https://www.ansatt.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/serviceklage
https://www.ansatt.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler
https://www.ansatt.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/ros-til-nav

## Ingress i prod

https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/serviceklage
https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/feil-og-mangler
https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/ros-til-nav

# Kom i gang

Se [Contribute.md](CONTRIBUTE.md) for informasjon om hvordan du starter applikasjonen lokalt på egen maskin og hvordan du deployer til miljøer.

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/navno

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-navno.
