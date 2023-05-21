FROM node:12-slim

WORKDIR /coastwards

COPY package.json .

RUN npm install

ADD . .

COPY build-and-run.sh .

EXPOSE 8080

CMD ./build-and-run.sh
