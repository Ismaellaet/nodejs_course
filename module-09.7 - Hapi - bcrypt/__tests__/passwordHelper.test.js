const PasswordHelper = require("../src/helpers/passwordHelper");

const FAKE_PASSWORD = "fakepassword";
const HASH = "$2b$04$FWWZ8kId1FbRaAxTX7SfY.h00bKEzFWC8e4QmkhsRitBo10/IDyPi";

describe("Test bcrypt with password", () => {
	it("should crypt a password", async () => {
		const result = await PasswordHelper.hashPassword(FAKE_PASSWORD);

		expect(result.length).toBeGreaterThan(10);
	});

	it("should compare a hash with password", async () => {
		const result = await PasswordHelper.comparePassoword(
			FAKE_PASSWORD,
			HASH
		);

		expect(result).toBeTruthy();
	});
});
