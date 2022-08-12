# Storefront Backend Project
This repo houses the codebase for the storefront backend project for the full-stack Udacity course. 
This backend API is designed to supply RESTful routes and database logic for backend functionality.  
The database schema and routes are listed in the [REQUIREMENT.md] file.

## Getting Started
After cloning the repo, run [npm install] to initialize packages listed in the package.json. 
I worked with docker for the database container. The docker compose file is included in the repo so running the [docker compose up] command should allow access to the database. 


## Included Technologies
This application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Usage Notes


- The environmental variables have been added below to allow for testing and review. 

- ENV file (I haven't figured out how to format the README yet)

    POSTGRES_HOST=127.0.0.1

    POSTGRES_USER=root

    POSTGRES_PASSWORD=password

    POSTGRES_DB=storefront

    POSTGRES_TEST_DB=storefront_test

    BCRYPT_PASSWORD=there_is_no_spoon

    SALT_ROUNDS=10

    TOKEN_SECRET=uberdoobie45
