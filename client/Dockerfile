FROM node:latest

RUN mkdir -p /client

WORKDIR /client

RUN adduser user

RUN chown -R user /client

RUN chown -R node:node ./

COPY package.json /client/

COPY . /client

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]