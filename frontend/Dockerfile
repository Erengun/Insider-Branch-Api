FROM node:alpine as base
WORKDIR /app

COPY package.json package-lock.json ./
COPY . .

RUN npm install
RUN npm install -g http-server
RUN npm run build
CMD ["npx", "http-server", "./dist"]

EXPOSE 8080