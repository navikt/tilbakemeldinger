FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:24-slim

WORKDIR /app

# The server bundle is self-contained - no node_modules in the image.
COPY package.json .env /app/
COPY dist /app/dist/

ENV NODE_ENV=production

EXPOSE 9001
ENTRYPOINT ["node"]
CMD ["--env-file-if-exists=.env", "dist/server/index.js"]
