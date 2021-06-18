FROM node:latest

RUN mkdir -p /client

WORKDIR /client

COPY package.json /client/

COPY . /client

RUN chown -R node:node ./

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]