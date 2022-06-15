const BaseRoute = require("./base/baseRoute");

class HeroesRoute extends BaseRoute {
	constructor(db) {
		super();
		this.db = db;
	}

	list() {
		return {
			path: "/heroes",
			method: "GET",
			handler: (request, h) => {
				return this.db.read();
			},
		};
	}
}

module.exports = HeroesRoute;
