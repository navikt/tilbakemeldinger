FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim

WORKDIR /app

# package.json for the #dist/* imports the server loads the renderer and the manifest through.
# No node_modules: the server build bundles every dependency (vite.config.ts)
COPY package.json /app/
# The pages' scripts and styles are served from the CDN, so the server only needs the
# server build and the client build's manifest
COPY dist/server /app/dist/server/
COPY dist/client/.vite/manifest.json /app/dist/client/.vite/

ENV NODE_ENV=production

EXPOSE 9001
ENTRYPOINT ["node"]
CMD ["dist/server/main.js"]
