FROM node:18-alpine as build

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ .

CMD ["npm", "start"]