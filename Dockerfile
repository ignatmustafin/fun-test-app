FROM node:20.17.0-alpine as server_builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json ./
COPY package.*.json ./
COPY . .

RUN npm install