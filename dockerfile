FROM node:8-slim

RUN apt-get update && apt-get install -y dh-autoreconf libpng-dev

WORKDIR /coastwards

COPY package*.json .

RUN npm install

