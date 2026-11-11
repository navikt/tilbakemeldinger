# Copilot Instructions for Tilbakemeldinger

## Project Overview

This is a "frackend" application (frontend + backend) for collecting feedback to NAV (Norwegian Labour and Welfare Administration). It handles three types of feedback: service complaints (serviceklage), technical issues (feil-og-mangler), and compliments (ros-til-nav).

**Owner**: Team navno (#team-navno on Slack)

## Architecture

### Tech Stack

- **Frontend**: React
- **Backend**: Hono (Node.js)
- **Language**: TypeScript
- **Architecture Pattern**: Hono server renders the React frontend AND acts as an API proxy to internal services. The frontend's scripts and styles are uploaded to and served from the CDN

### Key Components

1. **React Frontend**: User-facing feedback forms
2. **Hono Backend**:
   - Renders the pages server-side
   - Exposes the API endpoints below
   - Proxies certain API requests to internal `tilbakemeldingsmottak-api`.

## API Endpoints

The endpoints are under `/person/kontakt-oss/tilbakemeldinger/api` (`server/api/api.ts`). The proxying endpoints are POST methods that validate the payload against its zod schema in `shared/schema/` and forward it to the tilbakemeldingsmottak-api.

| Endpoint                  | Method | Type Definition                 | Purpose                                                                                      |
| ------------------------- | ------ | ------------------------------- | -------------------------------------------------------------------------------------------- |
| `/mottak/serviceklage`    | POST   | `shared/types/ServiceKlage.ts`  | Send service complaints object to tilbakemeldingsmottak-api                                  |
| `/mottak/feil-og-mangler` | POST   | `shared/types/FeilOgMangler.ts` | Send technical issues and bugs to tilbakemeldingsmottak-api                                  |
| `/mottak/ros`             | POST   | `shared/types/RosTilNav.ts`     | Send compliments to NAV to tilbakemeldingsmottak-api                                         |
| `/fodselsnr`              | GET    |                                 | Takes the user token, and pulls out the fødselsnummer in order to display frontend in forms  |
| `/enheter`                | GET    |                                 | Fetches list of Nav-kontore from internal API for populating dropdowns in the frontend forms |

## Type Safety

**IMPORTANT**: Always use the TypeScript type definitions located in `shared/types/` when:

- Creating or modifying API endpoints
- Handling request/response payloads
- Building frontend forms
- Validating data structures

Type definitions are the source of truth for data contracts between frontend, backend, and downstream APIs.

## Coding Guidelines

### General Principles

- **Type Safety First**: Use TypeScript strictly; avoid `any` types
- **Proxy Pattern**: Hono backend should remain a thin proxy layer - business logic belongs in internal APIs
- **Error Handling**: Always handle errors gracefully and provide meaningful error messages to users
- **Validation**: Validate incoming data against type definitions before forwarding
- **Keep to the scope:** When fixing bugs or errors, stick to the task. Do not introduce new features or improve parts of the code unrelated to the bug or error being fixed.

### Frontend (React)

- Use functional components with hooks
- Keep components small and focused
- Follow React best practices
- Consider accessibility (a11y) for all form inputs

### Backend (Hono)

- Keep route handlers thin - delegate to service/controller layers
- Use async/await for asynchronous operations
- Implement proper error middleware
- Log relevant information for debugging (but avoid logging sensitive data)

### File Structure

- Type definitions: `shared/types/`
- Validation schemas (zod): `shared/schema/`
- Shared code should be in `shared/` to be accessible by both frontend and backend

## Environment-Specific Behavior

### Development

- Base URL: `https://www.ansatt.dev.nav.no/person/kontakt-oss/nb/tilbakemeldinger/`

### Production

- Base URL: `https://www.nav.no/person/kontakt-oss/nb/tilbakemeldinger/`

## Internationalization

The application supports Norwegian (`/nb/`, `/nn/` and `/en/` locale). When adding user-facing text:

- Language files are located in `shared/language/[en|nb|nn].ts`
- When adding new translations, ensure consistency across all supported languages.

## Testing Considerations

When adding or modifying code:

- Write unit tests for business logic
- Consider integration tests for API endpoints
- Test error scenarios and edge cases
- Validate against TypeScript type definitions

## Deployment

- Automated via GitHub Actions
- Workflows: "Deploy to dev" (manual) and "Build and deploy to prod and create a new release" (on push to main)
- The workflows are thin callers of the shared `navikt/navno-ci` reusable workflows (build → deploy → release); build steps and action versions live there, per-environment values (`.env` lines, CDN path, NAIS vars file) live here.
- The server build (`vite build --ssr`, vite.config.ts) bundles every dependency, and the image has no node_modules, so the SBOM comes from `pnpm-lock.yaml` (`sbom-from-lockfile`): anything that ends up in `dist` belongs in `dependencies`, not `devDependencies`
- `pnpm test:dist` runs the build without node_modules, as the image does (after `pnpm run build:local`); CI runs it after the build
- Deploys to Nais. See [Nais documentation](https://nais.io/docs/) for details when troubleshooting.
- See workflows in `.github/workflows/`

## Security and privacy reminders

- Never log sensitive user information.
- Application should be privacy first.
- Do not store tokens locally. Do not log them.
- Be mindful of GDPR and privacy requirements.

## References

- [README.md](../README.md) - Project overview and ingresses
- [CONTRIBUTE.md](../CONTRIBUTE.md) - Local development setup and deployment instructions

## Questions or Issues?

- GitHub: https://github.com/orgs/navikt/teams/navno
- Slack: #team-navno (for Nav employees)
