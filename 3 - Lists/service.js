const axios = require("axios");

const getCharacters = async (name) => {
	const url = `https://swapi.dev/api/people/?search=${name}`;
	const characters = await axios.get(url);

	return characters.data;
};

module.exports = {
	getCharacters,
};
