FROM node:20-alpine3.20

WORKDIR /app

COPY package.json /app

RUN npm i 

COPY . /app

ENTRYPOINT npm start

