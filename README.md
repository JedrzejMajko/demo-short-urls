
# Installation

1. Install Docker
2. Obtain Captcha keys (https://developers.google.com/recaptcha/docs/v3)
3. Setup ENV variables (details below)
4. Setup docker-compose.override.yml using docker-compose.override.yml.dist
5. Run ```docker compose up -d```
6. Profit - by default (when filling up empty vars from .env.example) the frontend will be available at http://localhost:9052 and the API at http://localhost:9051

# Structure

Docker compose consist of two services: 

## a) shorty-front 
Written in Astro + React + Typescript; used to generate static page for the form.
Astro is used to optimize and minimize the amount of JS and CSS sent to the client.

## b) shorty-api
Written in Typescript with NestJS framework directly handles redirections and creation of short links.

# ENV variables

## a) shorty-front

Confront .env.example for details.
.env should be present in shorty-front directory before building.

- PORT - port on which the server will run outside the docker
- GOOGLE_PUBLIC_API_KEY - public captcha V3 key https://developers.google.com/recaptcha/docs/v3
- SHORTY_API_DOMAIN - API domain as used outside the docker (with port), aka http://localhost:9051
- SHORTY_API_ABORT_TIMEOUT - Timeout after which requests to API will be terminated (10s default)

## b) shorty-api

Confront .env.example for details.
.env should be present in shorty-api directory before building.

- PORT - port on which the server will run outside the docker
- GOOGLE_RECAPTCHA_SECRET_KEY - private (secret) captcha V3 key https://developers.google.com/recaptcha/docs/v3
- DATABASE_URL - URL to the database, used by Prisma. Prisma is configured to use sqlite database.
- SHORT_PROTODOMAIN - API domain as used outside the docker (with port), aka http://localhost:9051
- SHORTWEB_PROTODOMAIN - Domain of the frontend (used to redirect user to web 404 page)
- SWAGGER_ENABLED - Enable swagger documentation with JSON schema
- SWAGGER_BASIC_USER - Enable basic auth for swagger
- SWAGGER_BASIC_PASS - Enable basic auth for swagger
- SWAGGER_TITLE - Title of the swagger documentation
- SWAGGER_DESCRIPTION - Description of the swagger documentation
- SWAGGER_API_VERSION - API version of the swagger documentation