FROM node:alpine as base
WORKDIR /app

COPY package.json package.lock ./
COPY . .

RUN npm install
CMD ["node", "index.js"]

EXPOSE 3000