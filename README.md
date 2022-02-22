# Storefront Backend Project

## Getting Started

Welcome to this Udacity Project foked and completed by my own.

## Installation

1. Clone this repo to your local folder
2. Install all depedencies thanks to `npm install`
3. Put your "database.json" configuration file into the root folder
4. Launch your Postgres instance (you can use `docker-compose up`) and create the database
5. Implement the schema with `db-migrate up`
6. Compile the API with `npm run tsc`
7. Enjoy with `npm run start`

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
