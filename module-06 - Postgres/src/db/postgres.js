const ICrud = require("./interface/Crud");
const Sequelize = require("sequelize");

class Postgres extends ICrud {
	constructor() {
		super();
		this._sequelize = null;
		this._heroes = null;
		this._connect();
	}

	async isConnected() {
		try {
			await this._sequelize.authenticate();
			return true;
		} catch (error) {
			console.error(error);
			return false;
		}
	}

	_connect() {
		this._sequelize = new Sequelize(
			"heroes",
			process.env.DB_USERNAME,
			process.env.DB_PASSWORD,
			{
				host: "localhost",
				dialect: "postgres",
				quoteIdentifiers: false,
			}
		);

		this.defineModel();
	}

	defineModel() {
		this._heroes = this._sequelize.define(
			"heroes",
			{
				id: {
					type: Sequelize.INTEGER,
					primaryKey: true,
					autoIncrement: true,
					allowNull: false,
				},
				name: {
					type: Sequelize.STRING,
					allowNull: false,
				},
				power: {
					type: Sequelize.STRING,
					allowNull: false,
				},
			},
			{
				tableName: "tb_heroes",
				freezeTableName: false,
				timestamps: false,
			}
		);
	}

	async create(item) {
		return await this._heroes.create(item);
	}

	async read(item = {}) {
		return await this._heroes.findAll({ where: item, raw: true });
	}

	async update(id, item) {
		const updateHero = await this._heroes.update(item, {
			where: { id: id },
		});

		return updateHero ? true : false;
	}

	async delete(id) {
		const query = id ? { id } : {};

		const deleteHero = await this._heroes.destroy({ where: query });

		return deleteHero ? true : false;
	}
}
module.exports = Postgres;
