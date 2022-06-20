const api = require("../src/api");

let app = {};
let MOCK_ID;

const MOCK_HERO = {
	name: "Flash",
	power: "Speed",
};
const MOCK_HERO_UPDATE = {
	name: "Green Light",
	power: "Light",
};

const TOKEN =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJyYW5kb21Vc2VybmFtZSIsImlhdCI6MTY1NTc2NzA2MH0.JQLoNfuMx1JJPyPyjOtZ-40-HshfkyD2XdThQ_CBE7E";

const headers = {
	authorization: TOKEN,
};

describe("Heroes API", () => {
	beforeAll(async () => {
		app = await api;

		const result = await app.inject({
			method: "POST",
			url: `/heroes`,
			headers,
			payload: JSON.stringify(MOCK_HERO_UPDATE),
		});

		const data = JSON.parse(result.payload);

		MOCK_ID = data._id;
	});

	it("should return status code 200 in /heroes", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/heroes",
			headers,
		});
		const statusCode = result.statusCode;

		expect(statusCode).toBe(200);
	});

	it("should return heroes list as an array", async () => {
		const result = await app.inject({
			method: "GET",
			url: "/heroes",
			headers,
		});

		const datas = JSON.parse(result.payload);

		expect(Array.isArray(datas)).toBe(true);
	});

	it("should return heroes list with limit of registers - GET /heroes", async () => {
		const LIMIT = 2;
		const result = await app.inject({
			method: "GET",
			url: `/heroes?limit=${LIMIT}&skip=0`,
			headers,
		});

		const datas = JSON.parse(result.payload);

		expect(datas.length).toBe(LIMIT);
	});

	it("should return an error if invalid limit", async () => {
		const LIMIT = "HELLO";
		const result = await app.inject({
			method: "GET",
			url: `/heroes?limit=${LIMIT}&skip=0`,
			headers,
		});

		const errorLog = {
			error: "Bad Request",
			message: '"limit" must be a number',
			statusCode: 400,
			validation: { keys: ["limit"], source: "query" },
		};

		expect(result.result).toStrictEqual(errorLog);
	});

	it("should register a hero - POST /heroes", async () => {
		const result = await app.inject({
			method: "POST",
			url: `/heroes`,
			headers,
			payload: JSON.stringify(MOCK_HERO),
		});
		const { message } = JSON.parse(result.payload);

		expect(message).toBe("Hero registered successfully");
	});

	it("should update a hero - PATCH /heroes/:id", async () => {
		const id = MOCK_ID;
		const HERO_NAME_UPDATE = {
			name: "Yellow Light",
		};

		const result = await app.inject({
			method: "PATCH",
			url: `/heroes/${id}`,
			headers,
			payload: JSON.stringify(HERO_NAME_UPDATE),
		});

		const { message } = JSON.parse(result.payload);

		expect(message).toBe("Hero updated successfully");
	});

	it("should delete a hero - DELETE /heroes/:id", async () => {
		const id = MOCK_ID;

		const result = await app.inject({
			method: "DELETE",
			url: `/heroes/${id}`,
			headers,
			payload: JSON.stringify(id),
		});

		const { message } = JSON.parse(result.payload);

		expect(message).toBe("Hero deleted successfully");
	});
});
