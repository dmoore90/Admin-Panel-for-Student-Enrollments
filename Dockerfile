# Setup and build the client

FROM node:9.4.0-alpine as client

WORKDIR /app/client/

COPY client/package.json ./
COPY client/ ./

RUN useradd user

RUN chown -R user ./

USER user

RUN npm install

# Setup the server

FROM node:9.4.0-alpine

WORKDIR /app/
# COPY --from=client /usr/app/client/build/ ./client/build/
RUN useradd user

RUN chown -R user ./

USER user

WORKDIR /app/api/

COPY api/package.json ./
COPY api/ ./

RUN useradd user

RUN chown -R user ./

USER user

RUN npm install

ENV PORT 8080

EXPOSE 8080

CMD ["npm", "start"]