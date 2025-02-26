# simple-clean-achitecture-express
This project is a simple example of a clean architecture implementation in a Node.js application using Express.

## Project structure
```
.
├── src
│   ├── app.ts                      \- Express application setup.
│   ├── index.ts                    \- Server entry point.
│   ├── config                      \- Configuration files.
│   ├── domain
│   │   ├── entities                \- Domain entities (e.g., User, Invitation, Group, Member).
│   │   ├── errors                 \- Domain errors (e.g., InvalidEmailError, UserNotFoundError).
│   │   ├── repositories        \- Repository interfaces to be implemented in the infrastructure layer.
│   │   └── usecases             \- Business logic implementations (e.g., AcceptInvitationUseCase).
│   ├── infrastructure
│   │   ├── database                \- Database connection and setup.
│   │   └── repositories            \- repository implementations.
│   ├── interfaces
│   │   ├── controllers         \- Express controllers.
│   │   ├── routes                \- Express routes.
│   │   └── dto                     \- Data transfer objects (e.g., UserDto, InvitationDto).
│   └── utils                      \- Utility functions.
├── tests
│   └── integration
│        ├── features                \- Gherkin feature files for scenarios.
│        └── *.steps.ts              \- Step definitions and test cases.
├── apispec.yaml                  \- OpenAPI specification.
├── .env.test                         \- Environment variables for testing.
├── package.json                 \- Project metadata and dependencies.
└── README.md                   
```

## Domain
The project models a system with the following core entities:

- **User**  
  Represents a person using the application.

- **Group**  
  Represents a collection or team where users can belong.

- **Invitation**  
  Handles the process of inviting a user to a group. An invitation can be in different states (e.g., `PENDING`, `ACCEPTED`, `REJECTED`).

- **Member**  
  Represents the association of a user with a group after a successful invitation.

Business logic is implemented in use cases such as `AcceptInvitationUseCase`, which encapsulates the transaction to accept an invitation, update its status, and add the user as a group member.

## API Documentation
This project uses OpenAPI to define the API specification. The `apispec.yaml` file contains the API documentation, including the endpoints, request/response schemas, and error responses.
You can view the API documentation through Swagger UI or other [OpenAPI editor plugin](https://plugins.jetbrains.com/plugin/14837-openapi-swagger-editor).

## Getting Started

### Prerequisites

- Node.js and npm installed
- PostgreSQL (as specified in the environment configuration)
  - I recommend using Docker to run a PostgreSQL instance locally. You can use the following command:
    ```bash
    docker run -p 5432:5432 --name test-postgres \                                                                              (base) 0 (41.312s) < 22:19:44
        -e POSTGRES_PASSWORD=postgres \
        -d postgres:latest
    ``` 

### Installation
```bash
npm install
```

### Running the server
```bash
npm run dev
```

## Testing
The project includes integration tests using Cucumber.js. 
The test cases are defined in Gherkin feature files under the `tests/integration/features` directory. 
Each feature file contains scenarios that are implemented in step definitions under `tests/integration/*.steps.ts`.

To run the tests, execute the following command:
```bash
npm run test
```


