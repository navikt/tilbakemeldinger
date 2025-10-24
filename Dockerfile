FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22-slim

WORKDIR /app

COPY package*.json .env /app/
COPY node_modules /app/node_modules/
COPY server/dist  /app/server/dist/
COPY server/package*.json /app/server/
COPY server/node_modules* /app/server/node_modules/

ENV NODE_ENV=production

EXPOSE 9001
ENTRYPOINT ["node"]
CMD ["server/dist/server/server/src/server.js"]