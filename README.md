# Angular Spring Boot

Spring Boot application setup with Postgres backend and Angular front end

## Setup

1. [Download](https://www.docker.com/products/docker-desktop/) Docker Desktop
2. [Download](https://nodejs.org/en/download) Node.js
3. Pull and run official `docker-postgres` image: `npm run --prefix frontend postgres-download`

## Local Development

1. Start local postgres container: `npm run --prefix frontend postgres-start`
2. Run Java api: `npm run --prefix frontend boot-run`
3. Run Angular front end: `npm run --prefix frontend angular-serve`
4. When finished shutdown postgres: `npm run --prefix frontend postgres-stop`

## Package API and run as Jar

1. Start local postgres container: `npm run --prefix frontend postgres-start`
2. Package api as jar: `npm run --prefix frontend boot-package`
3. Run api as jar: `npm run --prefix frontend java-run`

## Containerize Database/API & Run

1. Build API image: `npm run --prefix frontend boot-image`
2. Run Docker compose: `npm run --prefix frontend docker-run`
3. Run Angular front end: `npm run --prefix frontend angular-serve`
