require("dotenv").config();
const Hapi = require("@hapi/hapi");
const Context = require("./db/base/ContextStrategy");
const MongoDb = require("./db/mongodb/mongodb");
const HeroesSchema = require("./db/mongodb/schemas/heroesSchema");
const HeroesRoute = require("./routes/heroesRoute");

const app = new Hapi.Server({
	port: process.env.PORT || 5000,
});

function mapRoutes(instance, methods) {
	return methods.map(method => instance[method]());
}

async function main() {
	const connection = MongoDb.connect();
	const context = new Context(new MongoDb(connection, HeroesSchema));

	app.route([...mapRoutes(new HeroesRoute(context), HeroesRoute.methods())]);

	await app.start();

	return app;
}
module.exports = main();
