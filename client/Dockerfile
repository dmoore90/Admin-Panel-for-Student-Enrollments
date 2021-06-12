FROM node:latest

RUN mkdir -p /client

WORKDIR /client

RUN adduser user

RUN chown -R user /client

COPY package.json /client/

COPY . /client

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]