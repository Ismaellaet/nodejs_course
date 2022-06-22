const api = require("../src/api");

let app = {};

const MOCK_HERO = {
	name: "Flash",
	power: "Speed",
};

describe("Heroes API", () => {
	beforeAll(async () => {
		app = await api;
	});

	it("should return status code 200 in /heroes", async () => {
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

		expect(result.result).toStrictEqual(errorLog);
	});

	it("should register a hero", async () => {
		const result = await app.inject({
			method: "POST",
			url: `/heroes`,
			payload: JSON.stringify(MOCK_HERO),
		});
		const { message } = JSON.parse(result.payload);

		expect(message).toBe("Hero registered successfully");
	});
});
