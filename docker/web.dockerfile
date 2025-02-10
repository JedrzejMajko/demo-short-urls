FROM node:20-alpine AS shorty-web-build

WORKDIR /app

COPY shorty-front/. .

RUN npm install
RUN npm run build


FROM nginx:alpine AS shorty-web-runtime
COPY ./docker/web-nginx.conf /etc/nginx/nginx.conf
COPY --from=shorty-web-build /app/dist /usr/share/nginx/html
EXPOSE 8080