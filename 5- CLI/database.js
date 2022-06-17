const fs = require("fs");
const { promisify } = require("util");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

class Database {
	constructor() {
		this.FILE_NAME = "heroes.json";
	}

	async searchByName(name) {
		const file = await this.readFile();

		const result = file.filter(item =>
			name ? item.name.includes(name) : true
		);

		return result;
	}

	async register(data) {
		if (!data.name) throw new Error(`Invalid hero name => ${data.name}`);
		const file = await this.readFile();
		const id = data.id ? data.id : Date.now().toString();
		const hero = {
			...data,
			id,
		};

		const allData = [...file, hero];

		await this.writeFile(allData);
		return `Hero ${data.name} registered!`;
	}

	async deleteById(id) {
		if (!id) return await this.writeFile([]);

		const file = await this.readFile();
		const heroIndex = file.findIndex(item => item.id == id);

		if (heroIndex === -1) throw new Error("Hero was not found!");

		file.splice(heroIndex, 1); // Delete hero
		await this.writeFile(file);

		return `Hero id = ${id} deleted!`;
	}

	async updateById(id, data) {
		if (!id) throw new Error(`Invalid Id`);

		const file = await this.readFile();
		const heroIndex = file.findIndex(item => item.id == id);

		if (heroIndex === -1) throw new Error("Hero was not found!");

		const newData = {
			...file[heroIndex],
			...data,
		};

		file.splice(heroIndex, 1, newData); // Update hero

		await this.writeFile(file);

		return `Hero with id = ${id} updated!`;
	}

	async writeFile(data) {
		await writeFileAsync(this.FILE_NAME, JSON.stringify(data));
		return true;
	}

	async readFile() {
		const file = await readFileAsync(this.FILE_NAME, "utf-8");

		return JSON.parse(file);
	}
}

module.exports = new Database();
