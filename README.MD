# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies
This application make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Database setup
- first Postgres should be installed and configured
- set the postgres username and password both to be `postgres`
- In psql shell Type ```CREATE DATABASE storefrontdb;``` and ```CREATE DATABASE storefrontdb_test``` to create databases for both dev and test
- Run the following commands to create the tables in the database:
```db-migrate up``` to create the tables in the database
```db-migrate down``` to delete the tables in the database

## Scripts
- Run ```yarn install``` to install all dependencies
- Run ```db-migrate up``` to create the tables in the database
- Run ```yarn start``` to start the application

## Environment Variables
- Create a .env file in the root of the project with the following variables:
```env
#DATABASE CONFIGURATION
POSTGRES_HOST= localhost
POSTGRES_PORT= 5432
POSTGRES_DATABASE= storefrontdb
POSTGRES_USER= postgres
POSTGRES_PASSWORD= postgres

#BYCRYPT CONFIGURATION
BYCRYPT_PASSWORD= udacity
SALT_ROUNDS= 10

#JSON WEB TOKEN CONFIGURATION
JWT_SECRET= udacity
JWT_EXPIRES_IN= '1d'
```