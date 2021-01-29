FROM node:15.5.0-alpine3.12

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli@7.4.1

USER node

WORKDIR /home/node/app