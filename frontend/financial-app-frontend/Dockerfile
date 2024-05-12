FROM node:latest as builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli@17.3.7

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=builder /dist/financial-app-frontend /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
