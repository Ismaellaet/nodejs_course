const Context = require("../src/db/base/ContextStrategy");
const MongoDb = require("../src/db/mongodb");
require("dotenv").config();

const context = new Context(new MongoDb());

const MOCK_HERO = {
	name: "Green Light",
	power: "Light",
};

let MOCK_HERO_ID = "";

describe("MongoDb Strategy", () => {
	beforeAll(async () => {
		await context.connect();
		const hero = await context.create(MOCK_HERO);
		MOCK_HERO_ID = hero.id;
	});
	it("should connect with mongodb", async () => {
		const result = await context.isConnected();

		expect(result).toBe("Connected");
	});

	it("should create a hero", async () => {
		const { name, power } = await context.create(MOCK_HERO);

		expect({ name, power }).toStrictEqual(MOCK_HERO);
	});

	it("should return hero", async () => {
		const [{ name, power }] = await context.read(MOCK_HERO, 1, 2);
		console.log({ name, power });
		expect({ name, power }).toStrictEqual(MOCK_HERO);
	});

	it("should update hero", async () => {
		const HERO_UPDATED = {
			name: "Yellow Light",
			power: "Light",
		};
		const result = await context.update(MOCK_HERO_ID, {
			name: "Yellow Light",
		});
		console.log(MOCK_HERO_ID);
		expect(result.modifiedCount).toBe(1);
	});

	it("should delete hero by id", async () => {
		const result = await context.delete(MOCK_HERO_ID);

		expect(result.deletedCount).toBe(1);
	});
});
