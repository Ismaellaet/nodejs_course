const axios = require("axios");
const { getCharacters } = require("../service");

jest.mock("axios");

it("should fetch characters", () => {
	const characters = {
		count: 1,
		next: null,
		previous: null,
		results: [
			{
				name: "R2-D2",
				height: "96",
				mass: "32",
				hair_color: "n/a",
				skin_color: "white, blue",
				eye_color: "red",
				birth_year: "33BBY",
				gender: "n/a",
				homeworld: "https://swapi.dev/api/planets/8/",
				films: [Array],
				species: [Array],
				vehicles: [],
				starships: [],
				created: "2014-12-10T15:11:50.376000Z",
				edited: "2014-12-20T21:17:50.311000Z",
				url: "https://swapi.dev/api/people/3/",
			},
		],
	};

	const response = { data: characters };
	axios.get.mockResolvedValue(response);
});

describe("Star Wars API test", () => {
	it("should search R2-D2 with correct format", async () => {
		const expected = [
			{
				name: "R2-D2",
				height: "96",
			},
		];

		const result = await getCharacters("r2-d2");

		expect(expected).toStrictEqual(result);
	});
});
