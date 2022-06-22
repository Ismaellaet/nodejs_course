const PasswordHelper = require("../src/helpers/passwordHelper");

const PASSWORD = "randompassword";
const HASH = "$2b$04$2cjEHYL0ggWIFbLVTmr7GO/dW1hV7sEIuQlqmh4OTKYvxg6fNoZf6";

describe("Test bcrypt with password", () => {
	it("should crypt a password", async () => {
		const result = await PasswordHelper.hashPassword(PASSWORD);
		console.log(result);
		expect(result.length).toBeGreaterThan(10);
	});

	it("should compare a hash with password", async () => {
		const result = await PasswordHelper.comparePassoword(PASSWORD, HASH);

		expect(result).toBeTruthy();
	});
});
