FROM node:20

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./

RUN yarn install

COPY src ./src

RUN yarn build

EXPOSE 5002 5003

CMD ["node", "dist/server.js"]
