# Angular Spring Boot

Spring Boot application setup with Postgres backend and Angular front end

## Setup

1. [Download](https://www.docker.com/products/docker-desktop/) Docker Desktop
2. [Download](https://nodejs.org/en/download) Node.js
3. Pull and run official `docker-postgres` image: `npm run --prefix front-end postgres-download`

## Local Development

1. Start local postgres container: `npm run --prefix front-end postgres-start`
2. Run Java api: `npm run --prefix front-end boot-run`
3. Run Angular front end: `npm run --prefix front-end angular-serve`
4. When finished shutdown postgres: `npm run --prefix front-end postgres-stop`

## Package API and run as Jar

1. Start local postgres container: `npm run --prefix front-end postgres-start`
2. Package api as jar: `npm run --prefix front-end boot-package`
3. Run api as jar: `npm run --prefix front-end java-run`

## Containerize Database/API & Run

1. Build API image: `npm run --prefix front-end boot-image`
2. Run Docker compose: `npm run --prefix front-end docker-run`
3. Run Angular front end: `npm run --prefix front-end angular-serve`
