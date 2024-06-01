# A Typescript Log Files Processor

### Dependencies

- [NodeJS](https://nodejs.org/en/)
  - Pre-requisite. Written with v16.x in mind.
- [Express](https://expressjs.com/)
  - Web Framework
- [dotenv](https://github.com/motdotla/dotenv)
  - Used to parse environment variables during development.
- [Axio](https://github.com/axios/axios)
  - Promise based HTTP client for the browser and node.js.
- [Sequilize](https://sequelize.org/)
  - Sequelize is a modern TypeScript and Node.js ORM for Postgres, MySQL, MariaDB, SQLite and SQL Server, and more. Featuring solid transaction support, relations, eager and lazy loading, read replication and more.
- [Luxon](https://github.com/moment/luxon)
  -Library for working with dates and times in JavaScript.
- [Pino](https://github.com/pinojs/pino)
  -Very low overhead Node.js logger.
- [Typescript](https://www.typescriptlang.org/)
  - Superset of Javascript. Written with Typescript 4 in mind.
- [Jest](https://jestjs.io/)
  - A delightful JavaScript Testing Framework with a focus on simplicity.
- [Supertest](https://github.com/visionmedia/supertest)
  - High-level abstraction for testing HTTP.
- [Prettier](https://prettier.io/)
  - An opinionated code formatter.


### Local Environment
Before running the application, we first need to install the dependencies and build the application.

```bash
$ yarn install
$ yarn run build
```

Then you can start the application by running the following command:
```bash
yarn start
```

### Default worker strategy to process files
You can create a new strategy to process files by implementing a new worker and put it into ```/src/workers``` directory.
Filename must follow the pattern: ```<workerActionName>Worker.ts``` so it can be called from 
```FileService.process(<workerActionName>)``` or from the following endpoint:
```bash
http://localhost:9000/api/files?action=<workerActionName>
```
The default worker strategy is ```countWordsWorker.ts``` which counts the number of words in all log files in ```/log``` directory.


### Process files by running fileProcessor.ts
You can process all log files in ```/log``` directory by running the following file:
```bash
$ npx ts-node src/fileProcessor.ts
```


### Process files by endpoint
After starting the application you can process al log files in ```/log``` directory by using the following endpoint GET:
```bash
http://localhost:9000/api/files?action=countWords
```


#### Commands
Out of the box, we have several commands to execute:

- `yarn run start`: Start the application in dev mode
- `yarn run debug`: Start the application in debug mode
- `yarn run test`: Run the unit tests
- `yarn run coverage`: Run the unit tests & generates the coverage report
- `yarn run serve:production"`: Start the application in production mode. You need to run  mode `yarn run build` first.
- `yarn run lint"`: Run the code linter.


### Docker
The services should start without any changes

```bash
$ docker build . -t <app-name>
$ docker run -it <app-name>
```


## Structure

```
src/
├── dtos/
├── models/
├── services/
├── router/
├── server/
├── logger.ts
├── database.ts
├── config.ts
└── app.ts
```

- `app.ts`: This is the start-up of the application. Here the database and the web server are initialized.
- `logger.ts`: Here the logger is configured and initialized.
- `database.ts`: Here the database connection and the ORM are initialized.
- `config.ts`: Here the configuration of the application is loaded from [environment variables](https://en.wikipedia.org/wiki/Environment_variable).
- `models/`: This folder contains all of the Data models of the application. This ones depends on the ORM [Sequilize](https://sequelize.org/). No logic should be place here.
- `services/`: This folder contains services, all the logic should be placed in classs representing the functionality the application is providing. 
- `router/`: This folder contains the "controllers". Here all http routes are defined. They mostly adapt the request to call a `services`.

*Note: Remeber to test your routes using jest and supertest*
