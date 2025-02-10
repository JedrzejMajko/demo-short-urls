FROM node:20-alpine AS shorty-api-base

WORKDIR /usr/src/app

COPY shorty-api/package*.json ./
RUN npm install
COPY shorty-api/. .

COPY ./docker/api.entrypoint.sh /api.entrypoint.sh
RUN ["chmod", "+x", "/api.entrypoint.sh"]

RUN npm run build

RUN npx prisma generate

ENV PORT=3000
EXPOSE 3000

ENTRYPOINT ["/api.entrypoint.sh"]
CMD ["node", "dist/main"]





