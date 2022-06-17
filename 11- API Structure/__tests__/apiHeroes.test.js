const api = require("../src/api");

let app = {};

describe("Heroes API", () => {
	beforeAll(async () => {
		app = await api;
	});

	it("should return heroes list in /heroes", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/heroes",
		});
		const statusCode = result.statusCode;

		expect(statusCode).toBe(200);
	});

	it("should return heroes list as an array", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/heroes",
		});

		const datas = JSON.parse(result.payload);

		expect(Array.isArray(datas)).toBe(true);
	});
});
