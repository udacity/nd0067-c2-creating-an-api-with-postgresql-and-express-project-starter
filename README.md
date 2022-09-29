# Udacity_store_project

## project setup
* 1- run -npm install- for packages installations
* 2- small note: you don't have to create any databases yourself, the scripts in package.json will create them for you, just follow the instructions 
* 2- change environmental variables in .env file (note: it's better to not change DATABASE and DATABASE_TEST variables but if you want to, then you have to do this additional step: 3)
* 3- go to package.json, update the following scripts:
*   -test: replace the (udacity_store_test) database with your own test_DB
*   -create_DB_test: replace (udacity_store_test) database with your own test_DB 
*   -create_DB: replace (udacity_store) with your own DB

* 4-now you should be ready to go:
*   -run [npm run migrations] to apply all migrations to your dev database
*   -

