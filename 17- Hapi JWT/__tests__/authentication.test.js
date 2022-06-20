const api = require("../src/api");
let app = {};
describe("Authentication - Login", () => {
	beforeAll(async () => {
		app = await api;
	});

	it("should get token", async () => {
		const result = await app.inject({
			method: "POST",
			url: "/login",
			payload: {
				username: "randomUsername",
				password: "randompassword",
			},
		});

		const data = JSON.parse(result.payload);
		console.log(data);
		expect(data.token.length).toBeGreaterThan(10);
	});
});
