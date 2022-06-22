const ICrud = require("../interface/Crud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
	constructor(connection, schema) {
		super();
		this._connection = connection;
		this._schema = schema;
	}

	async isConnected() {
		try {
			await this._connection.authenticate();
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	static connect() {
		const connection = new Sequelize(process.env.POSTGRES_URL, {
			logging: false,
			quoteIdentifiers: false,
			ssl: process.env.SSL_DB,
			dialectOptions: {
				ssl: process.env.SSL_DB,
			},
		});

		return connection;
	}

	static async defineModel(connection, schema) {
		const model = connection.define(
			schema.name,
			schema.schema,
			schema.options
		);

		await model.sync();

		return model;
	}

	async create(item) {
		return await this._schema.create(item);
	}

	async read(item = {}) {
		return await this._schema.findAll({ where: item, raw: true });
	}

	async update(id, item, upsert = false) {
		const func = upsert ? "upsert" : "update"; // Check if is upsert or update function

		const updateHero = await this._schema[func](item, {
			where: { id: id },
		});

		return updateHero ? true : false;
	}

	async delete(id) {
		const query = id ? { id } : {};

		const deleteHero = await this._schema.destroy({ where: query });

		return deleteHero ? true : false;
	}
}
module.exports = Postgres;
