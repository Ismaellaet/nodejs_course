require("dotenv").config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	"heroes",
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: "localhost",
		dialect: "postgres",
		quoteIdentifiers: false,
	}
);

async function main() {
	const Heroes = sequelize.define(
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
	await Heroes.sync();
	await Heroes.create({
		name: "Batman",
		power: "Widgets",
	});

	const result = await Heroes.findAll({
		raw: true,
		attributes: ["name"],
		where: {
			name: "Flash",
		},
	});

	console.log(result);
}

main();
