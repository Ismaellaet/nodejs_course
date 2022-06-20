const Context = require("../src/db/base/ContextStrategy");
const Postgres = require("../src/db/postgres/postgres");
const HeroesSchema = require("../src/db/postgres/schemas/heroesSchema");
require("dotenv").config();

const HERO = {
	name: "Gren Light",
	power: "Light",
};

let context = {};

describe("Postgres Strategy", () => {
	beforeEach(async () => {
		const connection = await Postgres.connect();
		const model = await Postgres.defineModel(connection, HeroesSchema);

		context = new Context(new Postgres(connection, model));

		await context.delete();
		await context.create(HERO);
	});

	it("should connect with postgres", async () => {
		const result = await context.isConnected();

		expect(result).toBe(true);
	});

	it("should create a hero", async () => {
		const { name, power } = await context.create(HERO);
		const result = { name, power };

		expect(result).toStrictEqual(HERO);
	});

	it("should return hero", async () => {
		const [result] = await context.read(HERO);
		delete result.id;

		expect(result).toStrictEqual(HERO);
	});

	it("should update hero", async () => {
		const HERO_UPDATED = {
			name: "Yellow Light",
		};
		const HERO_ID = 22;

		const result = await context.update(HERO_ID, HERO_UPDATED);

		expect(result).toBe(true);
	});

	it("should delete heroes", async () => {
		const result = await context.delete();

		expect(result).toBe(true);
	});
});
