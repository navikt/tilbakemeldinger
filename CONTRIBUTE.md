# Komme i gang

Hent repoet fra github

```
git clone https://github.com/navikt/tilbakemeldinger.git
```

## Installere pnpm

Dette prosjektet bruker **pnpm** som package manager. Node.js kommer ikke lenger med Corepack (fra Node 25), så installer pnpm selv, for eksempel slik:

```bash
npm install --global pnpm
```

Se https://pnpm.io/installation for andre måter. pnpm leser `packageManager`-feltet i `package.json` og bytter automatisk til riktig versjon.

## Installer avhengigheter

Installer nødvendige pakker:

```
pnpm install
```

Start applikasjonen lokalt:

```
pnpm dev
```

`pnpm dev` bruker mocks i stedet for tjenestene appen snakker med på NAIS (`server/dev/mocks.ts`). For å prøve skjemaene som innlogget, sett `"authenticated"` til `true` i `server/dev/data/authInfo.json`.

## Test og bygg

Kjør testene (client, shared og serveren i prosess):

```
pnpm test
```

Bygg lokalt med testverdier for miljøvariablene:

```
pnpm run build:local
```

## Lint og formatering

Prosjektet bruker **oxfmt** for formatering (`oxfmt.config.ts`) og **oxlint** for lint (`oxlint.config.ts`).

Sjekk formatering, lint og typer (kjøres også i CI):

```
pnpm run lint
```

Formater koden:

```
pnpm run format
```

Git-hooks er satt opp med **lefthook** (`lefthook.yml`) og installeres av `pnpm install`. Før hver commit fikses filene som er staget med oxlint og oxfmt, og typene sjekkes. Før hver push kjøres testene.

## Git blame

Kodebasen ble reformatert i én egen commit. For at `git blame` skal hoppe over denne
commiten og vise den opprinnelige forfatteren, kjør følgende én gang per klone:

```bash
git config blame.ignoreRevsFile .git-blame-ignore-revs
```

GitHub bruker `.git-blame-ignore-revs` automatisk, så dette gjelder kun lokalt.

## Deploy

Vi deployer med Github Actions. Denne applikasjonen kan deployes til prod og dev som skal være identiske miljøer med hensyn til testing.

### Deploy til dev-miljø

I Github Actions-fanen -> "Deploy to dev" -> velg Run workflow -> Velg branchen du vil deploye -> Run workflow

Du finner workflow her for mer informasjon: [Deploy-to-dev](https://github.com/navikt/tilbakemeldinger/actions/workflows/deploy.dev.yml)

## #Deploy til prod-miljø

1. Lag en PR til main
2. Be om godkjenning via teamets Slack-kanal
3. Husk å sjekke eventuelle byggfeil og varsler fra SonarCube.
4. Merge inn til main. Da vil applikasjonen bygge og deploye automatisk.
