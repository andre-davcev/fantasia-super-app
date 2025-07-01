# Angular Spring Boot

Spring Boot application setup with Postgres backend and Angular front end

## Setup

1. [Download](https://www.docker.com/products/docker-desktop/) Docker Desktop
2. [Download](https://nodejs.org/en/download) Node.js
3. Pull and run official `docker-postgres` image: `npm run --prefix frontend postgres-download`

## Spring Boot: Run

1. Start local postgres container: `npm run --prefix frontend postgres-start`
2. Run Java api: `npm run --prefix frontend boot-run`
3. Run Angular front end: `npm run --prefix frontend angular-serve`
4. When finished shutdown postgres: `npm run --prefix frontend postgres-stop`

## Fat JAR: Run

1. Start local postgres container: `npm run --prefix frontend postgres-start`
2. Package api as jar: `npm run --prefix frontend boot-package`
3. Run api as jar: `npm run --prefix frontend boot-run-jar`
4. Run Angular front end: `npm run --prefix frontend angular-serve`
5. When finished shutdown postgres: `npm run --prefix frontend postgres-stop`

## Docker: Run

1. Build Docker: `npm run --prefix frontend docker-build`
1. Run Docker compose: `npm run --prefix frontend docker-run`
1. When finished shutdown image: `npm run --prefix frontend docker-stop`

## Docker: Debug

1. Shell into API: `npm run --prefix frontend docker-shell-api`
2. Shell into DB: `npm run --prefix frontend docker-shell-db`
3. Shell into FE: `npm run --prefix frontend docker-shell-fe`

## Kubernetes: Setup

1. [Install](https://helm.sh/docs/intro/install/) Helm
2. [Install](https://kubernetes.io/docs/tasks/tools/) Kubernetes

## Kubernetes: Run

## Terraform: Setup

1. [Install](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli) Terraform
