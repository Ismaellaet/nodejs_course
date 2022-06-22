const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const JWT = require("jsonwebtoken");
const PasswordHelper = require("../helpers/passwordHelper");

const failAction = (request, h, error) => {
	throw error;
};

const FAKE_USER = {
	username: "randomUsername",
	password: "randompassword",
};

class AuthRoute extends BaseRoute {
	constructor(secret, db) {
		super();
		this.secret = secret;
		this.db = db;
	}

	login() {
		return {
			path: "/login",
			method: "POST",
			options: {
				auth: false,
				validate: {
					failAction,
					payload: Joi.object({
						username: Joi.string().required(),
						password: Joi.string().required(),
					}),
				},
			},
			handler: async req => {
				try {
					const { username, password } = req.payload;

					const [user] = await this.db.read({
						username: username.toLowerCase(),
					});

					const match = PasswordHelper.comparePassoword(
						password,
						user.password
					);

					// Check if credentials are valid
					if (!user || !match) {
						throw new Error("Invalid username or password!");
					}

					const token = JWT.sign(
						{
							id: user.id,
							username,
						},
						this.secret
					);

					return {
						token,
					};
				} catch (error) {
					throw new Error(error);
				}
			},
		};
	}
}

module.exports = AuthRoute;
