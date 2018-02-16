FROM node:7.8.0

MAINTAINER Guilherme Herzog

# Create app dir
RUN mkdir -p /app
WORKDIR /app

# Copy app (including package.json) into the image
COPY . /app

RUN npm install

RUN npm run dev-server

RUN npm run dev

EXPOSE 3000