const { getCharacters } = require("./service");

Array.prototype.myReduce = function (callback, initialValue) {
	let finalValue = initialValue !== undefined ? initialValue : this.shift();

	for (item of this) {
		finalValue = callback(finalValue, item);
	}

	return finalValue;
};

const main = async () => {
	try {
		const { results } = await getCharacters("a");

		const heights = results.map(character => +character.height);

		const totalHeight = heights.reduce((prev, cur) => prev + cur);
		// const totalHeight = heights.myReduce((prev, cur) => prev + cur);

		const averageHeight = totalHeight / 2;

		console.log(`Average height => ${averageHeight}`);
	} catch (error) {
		console.log(error);
	}
};

main();
