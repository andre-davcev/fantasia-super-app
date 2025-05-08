# Angular Spring Boot

Spring Boot application setup with Postgres backend and Angular front end

## Java Setup

1. Pull and run official docker-postgress image

```
docker run --name docker-postgres \
-p 5432:5432 \
-e POSTGRES_USER=postgres \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_DB=postgres \
-d \
postgres
```

## Java Run

1. Run `cd middleware/spring-boot`
2. Run `.gradlew bootRun`

## Angular Run

1. Run `cd front-end`
2. Run `npx nx serve taskmaster-angular`
