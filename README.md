# [reservation-api]

Languagealso available in:[Portugues](lang-pt.md) 

## Description

This project aims to create an API that is robust enough to make reservations for all types of events.

## Install and run the project

Running Reservation-API on your local machine is as simple as making a reservation.

### Global dependencies

You only need to have the following tool installed:

- Node.js LTS v16 (or any higher version)
- Docker (version 20.10 or higher)

### Run project

To run the project locally, just run the command below:

```bash
npm install
````

To be able to run the project create an `.env` file and follow with the same structure that is in `.env.example`, passing all the necessary parameters you can proceed to the next step.

```bash
npm run start
````

With that, the application will go up and the server will be exposed at the address:


```bash
http://localhost:3000/
```

### Run tests

There are several ways to run the tests, but we leave some commands configured to help, the first runs the unit and integration tests.

```bash
npm run test
```

To run the unit tests:

```bash
npm run test:unit
```

To run the integration tests:

```bash
npm run test:integration 
```

To view project coverage:

```bash
npm run test:ci
```
