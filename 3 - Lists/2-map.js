const service = require("./service");

Array.prototype.myMap = function (callback) {
	const newArray = [];

	for (let i = 0; i <= this.length - 1; i++) {
		const result = callback(this[i], i);
		newArray.push(result);
	}

	return newArray;
};

const main = async () => {
	const response = await service.getCharacters("a");

	console.time("forEach");
	let names = [];
	response.results.forEach((character) => {
		names.push(character.name);
	});
	console.timeEnd("forEach");

	console.time("map");
	const namesMap = response.results.map((character) => character.name);
	console.timeEnd("map");

	console.time("myMap");
	const namesMyMap = response.results.myMap((character, index) => {
		return character.name;
	});
	console.timeEnd("myMap");

	console.log(namesMyMap);
};

main();
