# Storefront Backend Project

## Getting Started

Welcome to this Udacity Project foked and completed by my own.

## Installation

1. Clone this repo to your local folder
2. Install all depedencies thanks to `npm install`
3. Configure the"database.json" file with your database credentials
4. Launch your Postgres instance (you can use `docker-compose up`)
5. Connect you to the postgres CLI with this example cmd : `psql -h localhost -p 5432 -U postgres`
6. Create the databases with these instructions into psql like this :
   ```
   CREATE DATABASE store;
   ```
7. Implement the schema with `db-migrate up`
8. Compile the API with `npm run tsc`
9. Enjoy with `npm run start`

---

- If you want to use the API with [Postman](), please set the ENV env variable to "dev"
- If you want to run the tests, please set the ENV env variable to "test"

## ENV variables with example for your .env file

```
host=127.0.0.1
database=store
database_test=store_test
user=postgres
password=password
ENV=dev
BCRYPT_PASSWORD=helloworld
SALT_ROUND=10
POSTGRES_PASSWORD=password
TOKEN_SECRET=secret
```

## API Endpoints

Please check the REQUIREMENTS.md file
