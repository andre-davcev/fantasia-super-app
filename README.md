# Angular Spring Boot

Spring Boot application setup with Postgres backend and Angular front end

## Setup

1. [Download](https://www.docker.com/products/docker-desktop/) Docker Desktop
2. [Download](https://nodejs.org/en/download) Node.js
3. Pull and run official `docker-postgres` image: `npm run postgres-download`

## Spring Boot: Run

1. Start local postgres container: `npm run postgres-start`
2. Run Java api: `npm run taskmaster-boot-run`
3. Run Angular front end: `npm run taskmaster-angular-serve`
4. When finished shutdown postgres: `npm run postgres-stop`

## Fat JAR: Run

1. Start local postgres container: `npm run postgres-start`
2. Package api as jar: `npm run taskmaster-boot-package`
3. Run api as jar: `npm run taskmaster-boot-run-jar`
4. Run Angular front end: `npm run taskmaster-angular-serve`
5. When finished shutdown postgres: `npm run postgres-stop`

## Docker: Run

1. Build Docker: `npm run taskmaster-docker-build`
2. Run Docker compose: `npm run taskmaster-docker-run`
3. When finished shutdown image: `npm run taskmaster-docker-stop`

## Docker: Debug

1. Shell into API: `npm run taskmaster-docker-shell-api`
2. Shell into DB: `npm run taskmaster-docker-shell-db`
3. Shell into FE: `npm run taskmaster-docker-shell-fe`
