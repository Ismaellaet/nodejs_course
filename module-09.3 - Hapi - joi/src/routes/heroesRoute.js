const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");

class HeroesRoute extends BaseRoute {
	constructor(db) {
		super();
		this.db = db;
	}

	list() {
		return {
			path: "/heroes",
			method: "GET",
			options: {
				validate: {
					failAction: (request, h, error) => {
						throw error;
					},
					query: Joi.object({
						name: Joi.string().max(50),
						limit: Joi.number().integer().default(10),
						skip: Joi.number().integer().default(0),
					}),
				},
			},
			handler: (request, h) => {
				try {
					const { name, limit, skip } = request.query;
					const query = name
						? {
								name: { $regex: `.*${name}*.`, $options: "i" },
						  }
						: {};

					return this.db.read(query, limit, skip);
				} catch (error) {
					throw new Error("Internal Server Error!");
				}
			},
		};
	}
}

module.exports = HeroesRoute;
