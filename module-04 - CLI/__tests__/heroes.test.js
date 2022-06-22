const db = require("../database");

const EXPECT_DEFAULT = [
	{
		id: 1,
		name: "Flash",
		power: "Speed",
	},
	{
		id: 2,
		name: "Green light",
		power: "Light",
	},
];

describe("File heroes manipulation", () => {
	beforeEach(async () => {
		return await db.writeFile(EXPECT_DEFAULT);
	});

	it("should read heroes file", async () => {
		const expected = EXPECT_DEFAULT;

		const result = await db.readFile();

		expect(result).toStrictEqual(expected);
	});

	it("should search hero by name", async () => {
		const expected = [
			{
				id: 1,
				name: "Flash",
				power: "Speed",
			},
		];

		const result = await db.searchByName("Flash");

		expect(result).toStrictEqual(expected);
	});

	it("should register a hero in heroes file", async () => {
		const expected = `Hero Batman registered!`;

		const newHero = {
			name: "Batman",
			power: "widgets",
		};

		const registerHero = await db.register(newHero);
		expect(registerHero).toStrictEqual(expected);
	});

	it("should delete a hero by id", async () => {
		const expected = "Hero id = 1 deleted!";

		const result = await db.deleteById(1);

		expect(result).toBe(expected);
	});

	it("should update a hero by id", async () => {
		const expected = "Hero with id = 2 updated!";

		const newData = {
			id: 2,
			name: "Red light",
			power: "Light",
		};

		const result = await db.updateById(2, newData);

		expect(result).toBe(expected);
	});
});
