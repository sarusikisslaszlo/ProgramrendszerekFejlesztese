FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install --force
COPY . .

RUN npm run build

COPY . .

EXPOSE 5001

CMD ["npm", "start"]
