# # Setup and build the client

# FROM node:9.4.0-alpine as client

# WORKDIR /app/client/

# COPY client/package.json ./
# COPY client/ ./

# RUN npm install

# # Setup the server

# FROM node:9.4.0-alpine

# WORKDIR /app/
# # COPY --from=client /usr/app/client/build/ ./client/build/

# WORKDIR /app/api/

# COPY api/package.json ./
# COPY api/ ./

# RUN npm install

# ENV PORT 8080

# EXPOSE 8080

# CMD ["npm", "start"]