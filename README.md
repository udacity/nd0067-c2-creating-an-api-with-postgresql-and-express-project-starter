# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get started in constructing an API. To get started, clone this repo and run `npm` in your terminal at the project root.

## Technologies
Application use the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- body-parser
- Cors
- pg and psql
- Docker containers
- eslint
- prettier

## Steps to run

### 1. Plan to Meet Requirements

In this repo there is a `REQUIREMENTS.md` document which outlines what this API needs to supply for the frontend, as well as the agreed upon data shapes to be passed between front and backend. 
 
The requirements document is updates with the following:
- The RESTful route for each endpoint listed. Add the RESTful route and HTTP verb to the document so that the frontend developer can begin to build their fetch requests.    

- The Postgres database tables based off the data shape requirements. The database tables and columns with foreign keys. 

### 2.  DB Creation and Migrations

- to create the DB we run the following:
REATE DATABASE "storefront-db";
REATE DATABASE "storefront-db-test";
\c "storefront-db"

GRANT ALL PRIVILEGES ON DATABASE "storefront-db" TO storefrontuser;
\dt
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO storefrontuser;
GRANT USAGE ON SCHEMA public TO storefrontuser;

- before running the test 
set ENV = test
to start the DB run (docker compose up)
db-migrate reset --env test
npm run test


### 3. Models

Create the models for each database table. The methods in each model should map to the endpoints in `REQUIREMENTS.md`. Remember that these models should all have test suites and mocks.

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

JWT functionality is added. JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. Environment variables

 POSTGRES_HOST=5432
 POSTGRES_HOST=127.0.0.1
 POSTGRES_DB=storefront-db
 POSTGRES_TEST_DB=storefront-db-test
 POSTGRES_USER=storefrontuser
 POSTGRES_PASSWORD=storefrontpassword
 BCRYPT_PASSWORD=secret
 SALT_ROUND=10
 TOKEN_SECRET=token_secret
 ENV=test


