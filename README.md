# Crypto-api

api for crypo exchange support common operations such as place , cancel, read order , create user, authentication system
*The code is uncleaned, no test and not refactor yet . If have a problem feel free to raise issues in repository

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/) 
- [Yarn](https://yarnpkg.com/) 
- [Docker] (https://www.docker.com/)

Set up
```bash
yarn add 
docker-compose up
yarn prisma migrate dev
yarn prisma seed
```

Environment Variables
```bash
// Create a .env file and define the following variables:
DATABASE_URL=your_database_url
PORT=your_desired_port
JWT_SECRET=your_jwt_secret
```

Run
```bash
yarn start
```


Using VSCode REST Client
  If you want to test the API using the VSCode REST Client, follow these steps:
  Install the REST Client extension in VSCode.
  Open the *.test.http file and send the requests.


ER Diagram
Below is the entity-relationship diagram for the database schema:
<div style="background-color: white; padding: 10px; display: inline-block;">
  <img src="prisma-erd.svg" width="600">
</div>