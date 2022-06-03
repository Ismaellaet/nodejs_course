const Hero = require("./hero");
const Database = require("./database");
const { Command } = require("commander");

const Commander = new Command();

Commander.version("v1")
	.option("-n --name [value]", "Hero name")
	.option("-p --power [value]", "Hero power")
	.option("-i --id [value]", "Hero id")
	.option("-l --list", "Hero list")
	.option("-s --search [value]", "Search hero by name")
	.option("-r --register", "Register a hero")
	.option("-u --update", "Update a hero")
	.option("-d --delete", "Delete a hero")
	.parse(process.argv);

const main = async () => {
	const options = Commander.opts();
	const hero = new Hero(options);

	const commandFunctions = {
		async list() {
			const result = await Database.searchByName();
			console.log(result);
			return;
		},

		async search() {
			const result = await Database.searchByName(options.search);
			console.log(result);
			return;
		},

		async register() {
			const result = await Database.register(hero);
			console.log(result);
			return;
		},

		async update() {
			const result = await Database.updateById(hero.id, hero);
			console.log(result);
			return;
		},

		async delete() {
			const result = await Database.deleteById(hero.id);
			console.log(result);
			return;
		},
	};

	try {
		const command = Object.keys(options)[0];

		commandFunctions[command]
			? commandFunctions[command]()
			: Commander.help();
	} catch (error) {
		console.error(error);
	}
};

main();
