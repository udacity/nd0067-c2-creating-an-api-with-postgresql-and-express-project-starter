# Storefront Backend Project
This repo houses the codebase for the storefront backend project for the full-stack Udacity course. 
This backend API is designed to supply RESTful routes and database logic for backend functionality.  
The database schema and routes are listed in the ```REQUIREMENT.md``` file.

# Getting Started
After cloning the repo, run `npm install` to initialize packages listed in the package.json. 
I worked with docker for the database container. The docker compose file is included in the repo so running `docker compose up` should execute. 
# Database Access
- Connect to the default postgres database as the server's root user:
    ```
    psql -U postgres
    ```
- In psql run the following to create a user. I used "full_stack_user" for user but it should function for any username so long as the corresponding `.env` variable is changed accordingly.
    ```
    CREATE USER full_stack_user WITH PASSWORD 'password123';
    ```
- In psql run the following to create the dev and test database
    ```
    CREATE DATABASE storefront;
    CREATE DATABASE storefront_test;
    ```
- Connect to the databases and grant all privileges
    - Grant for dev database
        ```
        \c storefront

        GRANT ALL PRIVILEGES ON DATABASE storefront TO root;
        ```
    - Grant for test database
        ```
        \c storefront_test

        GRANT ALL PRIVILEGES ON DATABASE storefront_test TO root;
        ```

## Usage Notes
- After successful database initialization, the command `npm run watch` will should compile and start the server at localhost:3000 (or whatever port you have it designated)
- The environmental variables have been added below to allow for testing and review.

- ENV file
```
    POSTGRES_HOST=127.0.0.1

    POSTGRES_USER=root

    POSTGRES_PASSWORD=password

    POSTGRES_DB=storefront

    POSTGRES_TEST_DB=storefront_test

    BCRYPT_PASSWORD=there_is_no_spoon

    SALT_ROUNDS=10

    TOKEN_SECRET=uberdoobie45
```
## Included Technologies
This application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing


