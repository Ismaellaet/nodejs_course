// Show Databases
// show db

// Switching to db
// use heros

// Show tables (collections)
// show collections

// Create item
db.heroes.insert({
	name: "Flash",
	power: "Speed",
	birthDate: "04-20-1990",
});

for (i = 0; i < 10; i++) {
	db.heroes.insert({
		name: `Robot ${i}`,
		power: "Technology",
		birthDate: "Unknown",
	});
}

// Read
db.heroes.find(); // Read all
db.heroes.find().pretty(); // Formatted
db.heroes.find().limit(5).sort({ name: -1 }); // Show only 5 items in decreasing order (name)
db.heroes.findOne(); // Read one
db.heroes.count(); // Count all items
db.heroes.find({}, { power: 1, _id: 0 }); // Show only power column

// Update
// Update only 1 key and keep the others -- Never forget $set
db.heroes.update(
	{ _id: ObjectId("62a765d074754a965b59cf65") },
	{ $set: { name: "Green Light" } }
);

// Update all item, deleting keys that were not specified
db.heroes.update(
	{ name: "Green Light" },
	{ name: "Yellow Light", power: "Light" }
);

// Delete
db.heroes.remove({}); // Remove all items
db.heroes.remove({ name: "Robot 5" });
