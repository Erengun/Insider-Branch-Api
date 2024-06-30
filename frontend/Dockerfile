FROM node:alpine as base
WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm install
CMD ["npm", "run", "dev"]

EXPOSE 8080

