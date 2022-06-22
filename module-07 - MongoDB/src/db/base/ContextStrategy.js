const ICrud = require("../interface/Crud");

class ContextStrategy extends ICrud {
	constructor(strategy) {
		super();
		this._database = strategy;
	}

	isConnected() {
		return this._database.isConnected();
	}

	connect() {
		return this._database.connect();
	}

	create(item) {
		return this._database.create(item);
	}

	read(item, limit, skip) {
		return this._database.read(item, limit, skip);
	}

	update(id, item) {
		return this._database.update(id, item);
	}

	delete(id) {
		return this._database.delete(id);
	}
}

module.exports = ContextStrategy;
