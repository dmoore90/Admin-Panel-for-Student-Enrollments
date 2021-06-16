FROM node:latest

RUN mkdir -p /client

WORKDIR /client

COPY package.json /client/

COPY . /client

RUN npm install

RUN chown -R node:node ./

EXPOSE 3000

CMD ["npm", "start"]