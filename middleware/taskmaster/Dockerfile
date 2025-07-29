# Stage 1: Build the Java app
FROM gradle:jdk21-alpine as build
WORKDIR /app
COPY . .
RUN ./gradlew bootJar

# Stage 2: Run the API
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
RUN addgroup --system spring
RUN adduser -S -s /bin/false -G spring spring
RUN chown -R spring:spring /app
USER spring

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=1 CMD wget -qO- http://localhost:8080/actuator/health/ | grep UP || exit 1

CMD ["java", "-jar", "app.jar"]
