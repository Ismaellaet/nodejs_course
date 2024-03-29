const Bcrypt = require("bcrypt");
const { promisify } = require("util");

const hashAsync = promisify(Bcrypt.hash);
const compareAsync = promisify(Bcrypt.compare);
const SALT = process.env.SALT_PWD;

class PasswordHelper {
	static hashPassword(password) {
		return hashAsync(password, SALT);
	}

	static comparePassoword(password, hash) {
		return compareAsync(password, hash);
	}
}

module.exports = PasswordHelper;
