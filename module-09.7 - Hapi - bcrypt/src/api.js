require("dotenv").config();
const Hapi = require("@hapi/hapi");

const Context = require("./db/base/ContextStrategy");

const MongoDb = require("./db/mongodb/mongodb");
const HeroesSchema = require("./db/mongodb/schemas/heroesSchema");
const HeroesRoute = require("./routes/heroesRoute");

const Postgres = require("./db/postgres/postgres");
const UsersSchema = require("./db/postgres/schemas/UsersSchema");

const HapiJWT = require("hapi-auth-jwt2");
const AuthRoute = require("./routes/authRoute");

const app = new Hapi.Server({
	port: process.env.PORT || 5000,
});

function mapRoutes(instance, methods) {
	return methods.map(method => instance[method]());
}

const SECRET_KEY = process.env.SECRET_KEY;

async function main() {
	// MongoDB connection
	const connectionMongodb = MongoDb.connect();
	const contextMongodb = new Context(
		new MongoDb(connectionMongodb, HeroesSchema)
	);

	// MongoDB connection
	const connectionPostgres = await Postgres.connect();
	const modelPostgres = await Postgres.defineModel(
		connectionPostgres,
		UsersSchema
	);
	const contextPostgres = new Context(
		new Postgres(connectionPostgres, modelPostgres)
	);

	// https://www.npmjs.com/package/hapi-auth-jwt2
	await app.register([HapiJWT]);

	app.auth.strategy("jwt", "jwt", {
		key: SECRET_KEY,
		validate: async decoded => {
			const [exists] = await contextPostgres.read({
				id: decoded.id,
				username: decoded.username.toLowerCase(),
			});

			if (!exists) {
				return {
					isValid: false,
				};
			}

			return {
				isValid: true,
			};
		},
	});

	app.auth.default("jwt");

	app.route([
		...mapRoutes(new HeroesRoute(contextMongodb), HeroesRoute.methods()),
		...mapRoutes(
			new AuthRoute(SECRET_KEY, contextPostgres),
			AuthRoute.methods()
		),
	]);

	await app.start();

	return app;
}
module.exports = main();
