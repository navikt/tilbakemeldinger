FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim

WORKDIR /app

COPY package.json .env /app/
COPY node_modules /app/node_modules/
# The pages' scripts and styles are served from the CDN, so the server only needs the
# SSR bundle and the client build's manifest
COPY dist/ssr /app/dist/ssr/
COPY dist/client/.vite/manifest.json /app/dist/client/.vite/
COPY server /app/server/
COPY shared /app/shared/

ENV NODE_ENV=production

EXPOSE 9001
ENTRYPOINT ["node"]
# Node runs the server's TypeScript directly (type stripping)
CMD ["--env-file=.env", "server/prod-server.ts"]
