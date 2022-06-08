const ICrud = require("./interface/Crud");

class Postgres extends ICrud {
	constructor() {
		super();
	}

	create(item) {
		console.log("Hero created in Postgres");
	}
}

module.exports = Postgres;
