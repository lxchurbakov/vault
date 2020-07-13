FROM node:latest
WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY webpack.config.js ./
COPY .env ./
COPY src ./src

RUN npm install

CMD ["npm", "start"]