FROM node:latest

RUN mkdir -p /api

WORKDIR /api

RUN chown -R node:node /api

COPY package.json /api/

COPY . /api

RUN npm install

EXPOSE 3000
