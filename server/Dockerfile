FROM node:latest

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY .env ./
COPY src ./src
COPY migrations ./migrations

RUN npm install

CMD ["npm", "start"]