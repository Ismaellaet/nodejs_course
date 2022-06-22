const ICrud = require("../interface/Crud");
const Mongoose = require("mongoose");

const STATUS = {
	0: "Disconnected",
	1: "Connected",
	2: "Connecting",
	3: "Disconnecting",
};

class MongoDb extends ICrud {
	constructor(connection, schema) {
		super();
		this._connection = connection;
		this._schema = schema;
	}

	async isConnected() {
		const state = STATUS[this._connection.readyState];

		if (state === "Connected" || state !== "Connecting") return state;

		await new Promise(res => setTimeout(res, 1000));

		return STATUS[this._connection.readyState];
	}

	static connect() {
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

		return connection;
	}

	async create(item) {
		return await this._schema.create(item);
	}

	async read(item, limit = 0, skip = 0) {
		return await this._schema.find(item).limit(limit).skip(skip);
	}

	async update(id, item) {
		return await this._schema.update({ _id: id }, { $set: item });
	}

	async delete(id) {
		return await this._schema.deleteOne({ _id: id });
	}
}

module.exports = MongoDb;
