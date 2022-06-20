const Sequelize = require("sequelize");

const heroesSchema = {
	name: "heroes",

	schema: {
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

	options: {
		tableName: "tb_heroes",
		freezeTableName: false,
		timestamps: false,
	},
};

module.exports = heroesSchema;
