FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml ./
COPY mvnw ./
COPY .mvn .mvn
RUN chmod +x mvnw
RUN ./mvnw -q -DskipTests dependency:go-offline

COPY src src
RUN ./mvnw -q -DskipTests package

FROM eclipse-temurin:21-jre-jammy AS runtime
ARG APP_UID=10001
ARG APP_GID=10001

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && groupadd --system --gid ${APP_GID} appgroup \
    && useradd --system --uid ${APP_UID} --gid appgroup --create-home --home-dir /home/appuser appuser \
    && mkdir -p /app \
    && chown -R appuser:appgroup /app \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/target/app.jar /app/app.jar
RUN chown appuser:appgroup /app/app.jar

USER appuser

EXPOSE 8082
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
