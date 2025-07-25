# Tilbakemeldinger

![Deploy to prod](https://github.com/navikt/tilbakemeldinger/workflows/Deploy%20to%20prod/badge.svg) | ![Deploy to dev](https://github.com/navikt/tilbakemeldinger/workflows/Deploy%20to%20dev/badge.svg)

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

Bygg:

```
npm run build
```

Start applikasjonen lokalt:

```
npm start
```

## Deploy til dev-miljø

[Deploy-to-dev](https://github.com/navikt/tilbakemeldinger/actions/workflows/deploy.dev.yml) -> Run workflow -> Velg branch -> Run workflow

## Prodsetting

Lag en PR til main, og merge inn etter godkjenning (En automatisk release vil oppstå ved deploy til main)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/navno

## For Nav-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-navno.
