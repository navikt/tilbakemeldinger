# Tilbakemeldinger

![Deploy-to-prod](https://github.com/navikt/tilbakemeldinger/workflows/Deploy-to-prod/badge.svg) | ![Deploy-to-dev](https://github.com/navikt/tilbakemeldinger/workflows/Deploy-to-dev/badge.svg)

Frontend for innsending av tilbakemeldinger til NAV: Klage, ros og tekniske feil og mangler.

## Komme i gang

Hent repoet fra github

```
git clone https://github.com/navikt/tilbakemeldinger.git
```

Installer nødvendige pakker:

```
npm install
```

Start applikasjonen lokalt:

```
npm start
```

## Deploy til dev-miljø

[Deploy-to-dev](https://github.com/navikt/tilbakemeldinger/actions/workflows/deploy.dev.yml) -> Run workflow -> Velg branch -> Run workflow

## Prodsetting

Publiser en ny release på master for å starte deploy til prod

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
