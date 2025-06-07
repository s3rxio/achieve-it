FROM node:18-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install pnpm -g

RUN pnpm install

COPY . .

ARG VITE_API_URL

RUN npx nx build web

FROM nginx:alpine

COPY --from=build /app/apps/web/dist /usr/share/nginx/html

COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
