const ICrud = require("./interface/Crud");
const Mongoose = require("mongoose");

const STATUS = {
	0: "Disconnected",
	1: "Connected",
	2: "Connecting",
	3: "Disconnecting",
};

class MongoDb extends ICrud {
	constructor() {
		super();
		this._heroes = null;
		this._driver = null;
	}

	async isConnected() {
		const state = STATUS[this._driver.readyState];

		if (state === "Connected" || state !== "Connecting") return state;

		await new Promise(res => setTimeout(res, 1000));

		return STATUS[this._driver.readyState];
	}

	defineModel() {
		// Define heroes schema
		const heroesSchema = new Mongoose.Schema({
			name: {
				type: String,
				required: true,
			},
			power: {
				type: String,
				required: true,
			},
			insertedAt: {
				type: Date,
				default: new Date(),
			},
		});

		// Register model
		this._heroes = Mongoose.model("heroes", heroesSchema);
	}

	connect() {
		Mongoose.connect(
			`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/heroes`,
			{ useNewUrlParser: true },
			error => {
				if (!error) return;

				console.error(`Connection fail! => ${error}`);
			}
		);

		const connection = Mongoose.connection;
		connection.once("open", () => console.log("Database connected!"));

		this._driver = connection;

		this.defineModel();
	}

	async create(item) {
		return await this._heroes.create(item);
	}

	async read(item, limit = 0, skip = 0) {
		return await this._heroes.find(item).limit(limit).skip(skip);
	}

	async update(id, item) {
		return await this._heroes.update({ _id: id }, { $set: item });
	}

	async delete(id) {
		return await this._heroes.deleteOne({ _id: id });
	}
}

module.exports = MongoDb;
