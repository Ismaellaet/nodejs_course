const api = require("../src/api");
const Context = require("../src/db/base/ContextStrategy");
const Postgres = require("../src/db/postgres/postgres");
const UsersSchema = require("../src/db/postgres/schemas/UsersSchema");

let app = {};

const FAKE_USER = {
	username: "randomUsername",
	password: "randompassword",
};

const FAKE_USER_DB = {
	username: FAKE_USER.username.toLowerCase(),
	password: "$2b$04$2cjEHYL0ggWIFbLVTmr7GO/dW1hV7sEIuQlqmh4OTKYvxg6fNoZf6",
};

describe("Authentication - Login", () => {
	beforeAll(async () => {
		app = await api;

		const connection = await Postgres.connect();
		const model = await Postgres.defineModel(connection, UsersSchema);
		const contextPostgres = new Context(new Postgres(connection, model));

		// If user doesn't exists, insert into table
		await contextPostgres.update(null, FAKE_USER_DB, true);
	});

	it("should get token", async () => {
		const result = await app.inject({
			method: "POST",
			url: "/login",
			payload: FAKE_USER,
		});
		console.log(result);
		const data = JSON.parse(result.payload);

		expect(data.token.length).toBeGreaterThan(10);
	});

	it("should not authorize with the wrong credentials", async () => {
		const result = await app.inject({
			method: "POST",
			url: "/login",
			payload: {
				username: "wrongusername",
				password: "wrongpassword",
			},
		});

		const data = JSON.parse(result.payload);

		expect(data.error).toBe("Internal Server Error");
	});
});
