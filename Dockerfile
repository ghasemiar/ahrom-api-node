FROM node:20.10.0

WORKDIR /app

COPY package.json package-lock.json /app

RUN npm ci

COPY . /app

RUN npm run build

EXPOSE 9115