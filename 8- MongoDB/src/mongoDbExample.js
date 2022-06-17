const Mongoose = require("mongoose");
require("dotenv").config();

// Connect with DB
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

// /*
//     0: Disconnected
//     1: Connected
//     2: Connecting
//     3: Disconnecting
// */
setTimeout(() => {
	const state = connection.readyState; // Get connection status
	console.log(`State => ${state}`);
}, 1000);

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
const model = Mongoose.model("heroes", heroesSchema);

async function main() {
	// Create
	const createdHero = await model.create({
		name: "Flash",
		power: "Speed",
	});

	console.log(createdHero);

	// Read
	const list = await model.find();
	console.log(list);
}
