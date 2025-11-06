# Tilbakemeldinger

![Deploy to prod](https://github.com/navikt/tilbakemeldinger/workflows/Deploy%20to%20prod/badge.svg) | ![Deploy to dev](https://github.com/navikt/tilbakemeldinger/workflows/Deploy%20to%20dev/badge.svg)

Frackend for innsending av tilbakemeldinger til NAV: Klage, ros og tekniske feil og mangler.

## Arkitektur

Applikasjonen er en full-stack Node.js-løsning med server-side rendering (SSR) og klient-side hydrering.

### Teknisk stack

-   **Frontend**: Preact
-   **Backend**: Express.js
-   **Språk**: TypeScript
-   **Byggverktøy**: Vite

### Struktur

Applikasjonen bruker en monorepo-struktur med npm workspaces:

-   `src/` - Frontend-kode (Preact-komponenter, utilities, entry points)
-   `server/` - Backend-kode (Express-server, API-ruter, SSR-logikk)
-   `common/` - Delt kode mellom frontend og backend (lokalisering)

### Endepunkter

#### API-endepunkter

Disse endepunktene fungerer som proxy mellom frontend-klienten og [tilbakemeldingsmottak-api](https://github.com/navikt/tilbakemeldingsmottak-api).

| Endepunkt               | Metode | Beskrivelse                                                                                                                          |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| /mottak/serviceklage    | POST   | Mottar object fra klienten. Videresender til tilbakemeldingmsottak-api. [Typedefinisjon](common/types/ServiceKlage.ts) for payload.  |
| /mottak/feil-og-mangler | POST   | Mottar object fra klienten. Videresender til tilbakemeldingmsottak-api. [Typedefinisjon](common/types/FeilOgMangler.ts) for payload. |
| /mottak/ros-til-nav     | POST   | Mottar object fra klienten. Videresender til tilbakemeldingmsottak-api [Typedefinisjon](common/types/RosTilNav.ts) for payload.      |

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
