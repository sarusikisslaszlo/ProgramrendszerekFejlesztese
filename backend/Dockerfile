FROM node:14 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-alpine

WORKDIR /app

COPY --from=builder /app .

EXPOSE 5001

CMD ["npm", "start"]

FROM mongo:latest

WORKDIR /data

EXPOSE 27017

ENTRYPOINT ["mongod"]
