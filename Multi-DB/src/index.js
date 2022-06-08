const ContextStrategy = require("./db/base/ContextStrategy");
const MongoDb = require("./db/mongodb");
const Postgres = require("./db/postgres");

const contextMongo = new ContextStrategy(new MongoDb());
contextMongo.create();
const contextPostgres = new ContextStrategy(new Postgres());
contextPostgres.create();
