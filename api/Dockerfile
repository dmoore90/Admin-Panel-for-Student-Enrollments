FROM node:latest

RUN mkdir -p /api

WORKDIR /api

RUN adduser user

RUN chown -R user ./

RUN chown -R node:node ./

COPY package.json /api/

COPY . /api

RUN npm install

EXPOSE 3000

# CMD ["npm", "start"]
