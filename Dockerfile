FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

WORKDIR /app

COPY package.json .env /app/
COPY node_modules /app/node_modules/
COPY dist /app/dist/
COPY server/src /app/server/src/
COPY common /app/common/

ENV NODE_ENV=production

EXPOSE 9001
ENTRYPOINT ["node"]
# Node runs the server's TypeScript directly (type stripping)
CMD ["--env-file=.env", "server/src/server.ts"]
