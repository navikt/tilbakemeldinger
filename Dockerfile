FROM node:16-alpine
# RUN apk add --no-cache bash
ENV NODE_ENV production

WORKDIR usr/src/app
CMD ["npm", "run", "build"]
COPY server server/
COPY build build/

WORKDIR server
CMD ["npm", "run", "start"]
EXPOSE 8080

