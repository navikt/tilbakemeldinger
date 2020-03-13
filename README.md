# Kontakt oss

For klage, anke og ros

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


## Deployering

Applikasjonen bygges automatisk til dev / https://www-q0.nav.no/person/tilbakemeldinger ved merge til master eller ved manuell godkjenning i [CircleCI](https://circleci.com/gh/navikt/workflows/tilbakemeldinger). <br><br>
For å lansere applikasjonen til produksjon / https://www.nav.no/person/tilbakemeldinger, benytt [npm version](https://docs.npmjs.com/cli/version) til å oppdatere package.json og lage samsvarende Git-tag. Eks:

```
npm version patch -m "Din melding"
```

Push deretter den nye versjonen til GitHub og merge til master.

```
git push && git push --tags
```

Godkjenn produksjonssettingen i [CircleCI](https://circleci.com/gh/navikt/workflows/tilbakemeldinger).

## Logging

Feil ved API-kall blir logget via frontendlogger og vises i Kibana<br>
[https://logs.adeo.no](https://logs.adeo.no/app/kibana#/discover/ad01c200-4af4-11e9-a5a6-7fddb220bd0c)

## Henvendelser

Spørsmål knyttet til koden eller prosjektet kan rettes mot https://github.com/orgs/navikt/teams/personbruker

## For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-personbruker.
