FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:22

WORKDIR /app

COPY package*.json .env /app/
COPY node_modules /app/node_modules/
COPY server/dist  /app/server/dist/
COPY server/package*.json /app/server/
COPY server/node_modules* /app/server/node_modules/

EXPOSE 9001
CMD ["node", "-r", "dotenv/config", "server/dist/server/server/src/server.js", "dotenv_config_path=.env"]