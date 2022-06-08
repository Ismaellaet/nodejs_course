const ICrud = require("./interface/Crud");

class MongoDb extends ICrud {
	constructor() {
		super();
	}

	create(item) {
		console.log("Hero created in MongoDb");
	}
}

module.exports = MongoDb;
