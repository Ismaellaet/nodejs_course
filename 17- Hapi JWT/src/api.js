require("dotenv").config();
const Hapi = require("@hapi/hapi");

const Context = require("./db/base/ContextStrategy");
const MongoDb = require("./db/mongodb/mongodb");

const HeroesSchema = require("./db/mongodb/schemas/heroesSchema");
const HeroesRoute = require("./routes/heroesRoute");

const HapiJWT = require("hapi-auth-jwt2");
const AuthRoute = require("./routes/authRoute");

const app = new Hapi.Server({
	port: process.env.PORT || 5000,
});

function mapRoutes(instance, methods) {
	return methods.map(method => instance[method]());
}

async function main() {
	const connection = MongoDb.connect();
	const context = new Context(new MongoDb(connection, HeroesSchema));

	// https://www.npmjs.com/package/hapi-auth-jwt2
	await app.register([HapiJWT]);

	app.auth.strategy("jwt", "jwt", {
		key: process.env.SECRET_KEY,
		validate: () => {
			return {
				isValid: true,
			};
		},
	});

	app.auth.default("jwt");

	app.route([
		...mapRoutes(new HeroesRoute(context), HeroesRoute.methods()),
		...mapRoutes(
			new AuthRoute(process.env.SECRET_KEY),
			AuthRoute.methods()
		),
	]);

	await app.start();

	return app;
}
module.exports = main();
