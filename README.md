# Tilbakemeldinger

![Deploy to prod](https://github.com/navikt/tilbakemeldinger/workflows/Deploy%20to%20prod/badge.svg) | ![Deploy to dev](https://github.com/navikt/tilbakemeldinger/workflows/Deploy%20to%20dev/badge.svg)

Frackend for innsending av tilbakemeldinger til NAV: Klage, ros og tekniske feil og mangler.

## Arkitektur

Preact-basert frontend serves av Express-server. Express-serveren eksponerer API-endepunkter og fungerer dermed som en proxy mot internt tilbakemeldingsmottak-api.

### Endepunkter

| Endepunkt               | Metode | Beskrivelse                                                                                                                          |
| ----------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| /mottak/serviceklage    | POST   | Mottar object fra klienten. Videresender til tilbakemeldingmsottak-api. [Typedefinisjon](common/types/ServiceKlage.ts) for payload.  |
| /mottak/feil-og-mangler | POST   | Mottar object fra klienten. Videresender til tilbakemeldingmsottak-api. [Typedefinisjon](common/types/FeilOgMangler.ts) for payload. |
| /mottak/ros-til-nav     | POST   | Mottar object fra klienten. Videresender til tilbakemeldingmsottak-api [Typedefinisjon](common/types/RosTilNav.ts) for payload.      |

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
