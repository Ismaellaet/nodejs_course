const api = require("../src/api");

let app = {};

describe("Heroes API", () => {
	beforeAll(async () => {
		app = await api;
	});

	it("should return status code 200 in /heroes", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/heroes?limit=10&skip=0",
		});
		const statusCode = result.statusCode;

		expect(statusCode).toBe(200);
	});

	it("should return heroes list as an array", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/heroes?limit=10&skip=0",
		});

		const datas = JSON.parse(result.payload);

		expect(Array.isArray(datas)).toBe(true);
	});

	it("should return heroes list with limit of registers", async () => {
		const LIMIT = 2;
		const result = await app.inject({
			method: "GET",
			url: `/heroes?limit=${LIMIT}&skip=0`,
		});

		const datas = JSON.parse(result.payload);
		expect(datas.length).toBe(LIMIT);
	});

	it("should return an error if invalid limit", async () => {
		const LIMIT = "HELLO";
		const result = await app.inject({
			method: "GET",
			url: `/heroes?limit=${LIMIT}&skip=0`,
		});
		const errorLog = {
			error: "Bad Request",
			message: '"limit" must be a number',
			statusCode: 400,
			validation: { keys: ["limit"], source: "query" },
		};
		console.log(result);

		expect(result.result).toStrictEqual(errorLog);
	});
});
