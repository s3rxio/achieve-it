FROM node:18-alpine

WORKDIR /app

COPY package.json ./

RUN npm install nx pnpm crypto -g

RUN pnpm install

COPY . .

# RUN npx nx build api

EXPOSE 3000

CMD ["npx", "nx", "serve", "api"]
