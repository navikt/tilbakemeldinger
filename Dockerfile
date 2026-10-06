FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

WORKDIR /app

COPY package.json .env /app/
COPY node_modules /app/node_modules/
COPY dist /app/dist/
COPY server /app/server/
COPY shared /app/shared/

ENV NODE_ENV=production

EXPOSE 9001
ENTRYPOINT ["node"]
# Node runs the server's TypeScript directly (type stripping)
CMD ["--env-file=.env", "server/server.ts"]
