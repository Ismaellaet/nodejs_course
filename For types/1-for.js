const service = require("./service");

const main = async () => {
	let names = [];

	try {
		const response = await service.getCharacters("a");

		console.time("forOf");
		for (character of response.results) {
			names.push(character.name);
		}
		console.timeEnd("forOf");

		console.time("for");
		for (i = 0; i <= response.results.length - 1; i++) {
			const character = response.results[i];

			names.push(character.name);
		}
		console.timeEnd("for");

		console.time("forIn");
		for (let i in response.results) {
			const character = response.results[i];

			names.push(character.name);
		}
		console.timeEnd("forIn");

		console.log(names);
	} catch (error) {
		console.error(error);
	}
};

main();
