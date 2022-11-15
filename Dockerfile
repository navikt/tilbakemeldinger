FROM node:16-alpine
# RUN apk add --no-cache bash
ENV NODE_ENV production

WORKDIR usr/src/app
COPY server server/
COPY server/node_modules server/node_modules/
COPY build build/

WORKDIR server
CMD ["node", "./server.js"]
EXPOSE 8080

