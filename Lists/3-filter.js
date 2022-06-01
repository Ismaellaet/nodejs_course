const { getCharacters } = require("./service");

Array.prototype.myFilter = function (callback) {
	const newArray = [];

	for (item of this) {
		const result = callback(item);

		if (result) newArray.push(item);
	}

	return newArray;
};

const main = async () => {
	try {
		const { results } = await getCharacters("a");

		// const familyLars = results.filter(character =>
		// 	character.name.toLowerCase().includes("lars")
		// );

		const familyLars = results.myFilter(character =>
			character.name.toLowerCase().includes("lars")
		);

		console.log(familyLars);
	} catch (error) {
		console.log(error);
	}
};

main();
