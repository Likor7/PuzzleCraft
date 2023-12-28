FROM eclipse-temurin:17-jdk-alpine

VOLUME /tmp

# Create an application directory
RUN mkdir -p /app

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the jar file into the container
COPY target/*.jar app.jar

ENTRYPOINT ["java","-jar","app.jar"]