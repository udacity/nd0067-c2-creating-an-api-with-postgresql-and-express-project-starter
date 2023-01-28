
# Storefront Backend Project

## Installation

### Clone github project

To get started, clone this project:

```git clone git@github.com:djascorp/node-storefront-api.git```

And then go to the new created folder:

```cd node-storefront-api```

### Configuration files
To be able to start this project, you have to set up the **config file** and **the postgres database**:
- Copy the ``.env.exemple`` file in the root of the project and name it as ``.env``
- Copy the ``database.exemple.json`` file in the root of the project and name it as ``database.json``
- Prepare your ``postgres`` server at the port **5432** (You can change the port in your **.env** file if it doesn't suit you)
- Create two database for development and test : ``node_storefront`` and ``node_storefront_test``
- The application run at PORT **3000** in development mode and **3001** in test mode as default
- You can change your database password as the password in the ``.env`` file or set the password in the ``.env`` like your password

To resume the the default configuration:

***
> - Postgres PORT : 5432
> - Database name : **node_storefront** in dev and **node_storefront_test** for test
> - Database default username and password can be changed in .env
> - App PORT is **3000** in development mode and **3001** in test mode
> - All parameters that need to be changed can be edit in ``.env`` file
***

In the end, the ``.env`` file contains the environment configuration needed to run this application. 
The ``database.json`` contains the information of the database for **development** and **test**. 

### Install dependencies with yarn

After setting up all the config file, you can install the dependencies with the command:

```yarn install```

This command will install all the dependencies of the project.

## User guide

- ``yarn watch`` : To start the development server
- ``yarn test`` : To run the application testing
- ``yarn build`` : To generate builded javascript in the ``/dist`` folder  

## Folder Architecture

- Readme file: ``/README.md``
- Requirement file: ``/REQUIREMENTS.md``
- Model folder: ``/src/models``
- Handler folder: ``/src/controllers``
- Migrations folder: ``/migrations``


To start using the guarded link, you have to generate **TOKEN** and use the generated token as a **Bearer token**.
You can generate token in the link: ``[POST] : /users/verify {username: string, password: string}``.
As mentioned in the ``/REQUIREMENTS.md`` file.
You can use these:
```
username: 'djasnive'
password: '123456'

username: 'marlot'
password: '123456'
```

