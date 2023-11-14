# Storefront Backend

This project is part of the Udacity Full-Stack Javascript Nanodegree

It provides an express application serving several API endpoints for storing and accessing data, located in a postgres database. It serves routes for users, orders and products. It uses JWT Token for authorization.

## API Reference

Go to the `REQUIREMENTS.md` file for the API Endpoint reference and data shape documentation.

## Scripts

Run prettier

```bash
  yarn prettier
```

Run lint

```bash
  yarn lint
```

Run tests

```bash
  yarn test
```

Start the dev server

```bash
  yarn dev
```

Build the project

```bash
  yarn build
```

Run the application

```bash
  yarn start
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/sangpham27/nd0067-c2-creating-an-api-with-postgresql-and-express.git
```

Go to the project directory

```bash
  cd nd0067-c2-creating-an-api-with-postgresql-and-express/
```

Install dependencies

```bash
  yarn install
```

Set up the `.env` file for connecting to the database and a working authorization. `.env.example` file is provided with needed keys

Run the migrations

```bash
  db-migrate up
```

Start the dev server

```bash
  yarn dev
```

Start the docker postgres container

```bash
  docker-compose up -d
```

Application will run on port 3000

## Running Tests

To run tests, run the following command

```bash
  yarn test
```

## Author

SangPT4 ([@sangpham27](https://github.com/sangpham27))
