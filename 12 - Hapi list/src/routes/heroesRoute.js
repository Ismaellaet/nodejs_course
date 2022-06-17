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
				try {
					const { name, limit, skip } = request.query;
					const query = {};

					if (name) {
						query.name = name;
					}

					return this.db.read(query, parseInt(limit), parseInt(skip));
				} catch (error) {
					throw new Error("Internal Server Error!");
				}
			},
		};
	}
}

module.exports = HeroesRoute;
