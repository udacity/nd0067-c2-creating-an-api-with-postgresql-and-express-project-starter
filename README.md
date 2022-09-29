# Udacity_store_project

## Development setup
* 1- run -npm install- for packages installation
* 2- small note: you don't have to create any databases yourself, the scripts in package.json will create them for you, just follow the instructions 
* 2- change environmental variables in .env file (note: it's better to not change DATABASE and DATABASE_TEST variables but if you want to, then you have to do this additional step: 3)
* 3- go to package.json, update the following scripts:
*   -test: replace the (udacity_store_test) database with your own test_DB name
*   -create_DB_test: replace (udacity_store_test) database with your own test_DB name
*   -create_DB: replace (udacity_store) with your own DB name

* 4-now you should be ready to go:
*   -run [npm run tsc] to build all files to js files
*   -run [npm run create_DB] to create the dev database for you 
*   -run [npm run migrations] to apply all migrations to your dev database
*   -run [npm run watch] to run to app on port 3000, databases will run on port 5432

## Test setup
* 1- first make sure you have already made the development setup steps
* 2- run [npm run create_DB_test] 
* 3- run [npm run test]
* note: after running the test, test_DB will be dropped automatically. so you need to create the test_DB every time before running a test

