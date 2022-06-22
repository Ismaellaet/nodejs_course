const Sequelize = require("sequelize");

const userSchema = {
	name: "users",

	schema: {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false,
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	},

	options: {
		tableName: "tb_users",
		freezeTableName: false,
		timestamps: false,
	},
};

module.exports = userSchema;
