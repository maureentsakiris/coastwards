FROM node:12-slim

RUN apt-get update -qq && apt-get install -y gcc make libpng-dev

WORKDIR /coastwards

COPY package.json .

RUN npm install

ADD . .

EXPOSE 8080

CMD node server.js
