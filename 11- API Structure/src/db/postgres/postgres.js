const ICrud = require("../interface/Crud");
const Sequelize = require("sequelize");
const HeroesSchema = require("./schemas/heroesSchema");

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
		const connection = new Sequelize(
			"heroes",
			process.env.DB_USERNAME,
			process.env.DB_PASSWORD,
			{
				host: "localhost",
				dialect: "postgres",
				quoteIdentifiers: false,
				logging: false,
			}
		);

		return connection;
	}

	static defineModel(connection, schema) {
		const model = connection.define(
			schema.name,
			schema.schema,
			schema.options
		);

		return model;
	}

	async create(item) {
		return await this._schema.create(item);
	}

	async read(item = {}) {
		return await this._schema.findAll({ where: item, raw: true });
	}

	async update(id, item) {
		const updateHero = await this._schema.update(item, {
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
