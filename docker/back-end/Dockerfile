FROM eclipse-temurin:17-jdk-alpine

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

COPY target/*.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]