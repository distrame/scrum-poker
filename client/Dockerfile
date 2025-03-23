FROM node:23.9.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
