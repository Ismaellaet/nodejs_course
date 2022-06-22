const BaseRoute = require("./base/baseRoute");
const Joi = require("joi");
const JWT = require("jsonwebtoken");

const failAction = (request, h, error) => {
	throw error;
};

const FAKE_USER = {
	username: "randomUsername",
	password: "randompassword",
};

class AuthRoute extends BaseRoute {
	constructor(secret) {
		super();
		this.secret = secret;
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

					if (
						username.toLowerCase() !==
							FAKE_USER.username.toLowerCase() ||
						password !== FAKE_USER.password
					) {
						return "Invalid username or passoword!";
					}

					const token = JWT.sign(
						{
							id: 1,
							username,
						},
						this.secret
					);

					return {
						token,
					};
				} catch (error) {
					console.error(`Error => ${error}`);
				}
			},
		};
	}
}

module.exports = AuthRoute;
