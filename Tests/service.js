const axios = require("axios");

const URL = "https://swapi.dev/api/people";

const getCharacters = async name => {
	const url = `${URL}/?search=${name}&format=json`;
	const result = await axios.get(url);

	return result.data.results.map(mapCharacterData);
};

const mapCharacterData = data => {
	return {
		name: data.name,
		height: data.height,
	};
};

module.exports = {
	getCharacters,
};
