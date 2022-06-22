class Hero {
	constructor({ id, name, power }) {
		if (id) {
			this.id = id;
		}

		if (name) {
			this.name = name;
		}

		if (power) {
			this.power = power;
		}
	}
}

module.exports = Hero;
