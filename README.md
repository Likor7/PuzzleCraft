# PuzzleCraft

PuzzleCraft is a web-based puzzle game where users can upload an image and solve it as a jigsaw puzzle.


## Note

I have tried to create an algorithm for automatic puzzle solving, but I am still studying this topic.

I share the sources I use for this purpose:

[CrisJim231AProject](https://web.stanford.edu/class/cs231a/prev_projects_2016/CrisJim231AProject.pdf)

[Automatic assembly of jigsaw puzzles from digital images](https://dspace.cuni.cz/bitstream/handle/20.500.11956/38619/BPTX_2010_1__0_259272_0_96732.pdf?sequence=1&isAllowed=y)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project, you'll need:

       - Java JDK 17
       - Maven
       - Node.js
       - Docker (optional, for Docker-based setup)

### Running Locally

1. Backend Setup
    Navigate to the back-end directory and run the Spring Boot application:

        cd backend
        mvn spring-boot:run

    The backend server will start on http://localhost:8080.

2. Frontend Setup

    Open a new terminal, navigate to the front-end directory, and start the React application:

           cd frontend
           npm install
           npm start

    The frontend application will be available at http://localhost:3000.

## Running with Docker

You can also run the entire application using Docker. This is a simpler approach as it does not require setting up Java or Node.js environments on your machine.

1. Build backend for jar file

           cd backend
           mvn package

2. Build and Run with Docker Compose

Navigate to the root directory of the project where the docker-compose.yml file is located and run:

```docker-compose up --build```

This command will build the Docker images for the frontend and backend and start the containers.

The frontend can be accessed at http://localhost:3000, and the backend will be available at http://localhost:8080.

3. Stop the Application

To stop the application, press Ctrl+C in the terminal where Docker Compose is running. To remove the containers created by Docker Compose, run:

```docker-compose down```

Test for DevCOM
