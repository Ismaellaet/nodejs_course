const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");

const failAction = (request, h, error) => {
	throw error;
};

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
					failAction,
					query: Joi.object({
						name: Joi.string().max(50),
						limit: Joi.number().integer().default(10),
						skip: Joi.number().integer().default(0),
					}),
				},
			},
			handler: req => {
				try {
					const { name, limit, skip } = req.query;
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

	create() {
		return {
			path: "/heroes",
			method: "POST",
			options: {
				validate: {
					failAction,
					payload: Joi.object({
						name: Joi.string().min(3).max(50).required(),
						power: Joi.string().min(3).max(50).required(),
					}),
				},
			},
			handler: async req => {
				try {
					const { name, power } = req.payload;

					const result = await this.db.create({ name, power });

					return {
						message: "Hero registered successfully",
						_id: result._id,
					};
				} catch (error) {
					throw new Error(error);
				}
			},
		};
	}

	update() {
		return {
			path: "/heroes/{id}",
			method: "PATCH",
			options: {
				validate: {
					params: Joi.object({
						id: Joi.string().required(),
					}),

					payload: Joi.object({
						name: Joi.string().min(3).max(50),
						power: Joi.string().min(3).max(50),
					}),
				},
			},
			handler: async req => {
				try {
					const { id } = req.params;
					const { payload } = req;
					const result = await this.db.update(id, payload);

					if (result.modifiedCount !== 1) {
						return "Unable to update hero";
					}

					return {
						message: "Hero updated successfully",
					};
				} catch (error) {
					console.error(`Error => ${error}`);
				}
			},
		};
	}
}

module.exports = HeroesRoute;
