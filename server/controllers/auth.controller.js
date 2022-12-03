const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const { emailHtml } = require("../utils/email");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const _ = require("lodash");

exports.registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	User.findOne({ email }).exec((err, user) => {
		if (err) {
			console.log("Error in searching the email");
			return res.json({
				error: err,
			});
		}
		if (user) {
			return res.status(400).json({
				error: "This email is already taken. Try Again",
			});
		}
		const token = jwt.sign(
			{
				name,
				email,
				password,
			},
			process.env.JWT_ACCOUNT_ACTIVATION,
			{ expiresIn: "15m" }
		);
		const emailData = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: `Account Activation Link`,
			html: emailHtml(name, process.env.CLIENT_URL, token, email),
		};
		sgMail
			.send(emailData)
			.then((sent) => {
				return res.json({
					message: `An activation email has been sent to ${email}.`,
				});
			})
			.catch((err) => {
				console.log(err);
				return res.json({
					message: err.message,
				});
			});
	});
};

exports.activateUser = async (req, res) => {
	const { token } = req.body;
	if (token) {
		jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decoded) => {
			if (err) {
				console.log("Account Activation Error");
				return res.status(401).json({
					error: "Link Expired. Sign Up again",
				});
			}
			const { name, email, password } = jwt.decode(token);
			const user = new User({ name, email, password });
			user.save((err, user) => {
				if (err) {
					console.log("save user error");
					return res.status(401).json({
						error:
							"Error saving user information in the database. Try signing up again",
					});
				}
				return res.json({
					message: "Signup success. Please Sign In",
				});
			});
		});
	} else {
		return res.json({
			error: "Somwthing went horribly wrong. Please die again",
		});
	}
};

exports.signInUser = async (req, res) => {
	const { email, password } = req.body;
	User.findOne({ email }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User with this email does not exist. Please sign up",
			});
		}
		if (!user.authenticate(password)) {
			return res.status(400).json({
				error: "Email and Password do not match. Please try again.",
			});
		}
		const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "7d",
		});
		const { _id, name, email, role } = user;
		return res.json({
			token,
			user: {
				_id,
				name,
				email,
				role,
			},
		});
	});
};

exports.forgotPassword = async (req, res) => {
	const { email } = req.body;

	User.findOne({ email }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User with this email does not exist",
			});
		}
		const token = jwt.sign(
			{
				_id: user._id,
			},
			process.env.JWT_RESET_PASSWORD,
			{ expiresIn: "15m" }
		);
		const emailData = {
			from: process.env.EMAIL_FROM,
			to: email,
			subject: `Forgot Password Link`,
			html: `
			<h3>Please use this link to reset your password</h3>
			<p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
			<hr />
			<p>This email may contain sensitive information</p>
			<p>${process.env.CLIENT_URL}</p>
			`,
		};
		return user.updateOne({ resetPasswordLink: token }, (err, success) => {
			if (err) {
				console.log("RESET PASSWORD LINK ERROR", err);
				return res.status(400).json({
					error: "Database connection error on user password forgot request",
				});
			} else {
				sgMail
					.send(emailData)
					.then((sent) => {
						return res.json({
							message: `A reset link has been sent to ${email}.`,
						});
					})
					.catch((err) => {
						console.log(err);
						return res.json({
							message: err.message,
						});
					});
			}
		});
	});
};

exports.resetPassword = async (req, res) => {
	const { resetPasswordLink, newPassword } = req.body;
	if (resetPasswordLink) {
		jwt.verify(
			resetPasswordLink,
			process.env.JWT_RESET_PASSWORD,
			(err, decoded) => {
				if (err) {
					return res.status(400).json({
						error: "Expired Link. Try again",
					});
				}
				User.findOne({
					resetPasswordLink,
				}).exec((err, user) => {
					if (err || !user) {
						return res.status(400).json({
							error: "Invalid Link. Try again",
						});
					}
					const updatedFields = {
						password: newPassword,
						resetPasswordLink: "",
					};
					user = _.extend(user, updatedFields);
					user.save((err, result) => {
						if (err) {
							return res.status(400).json({
								error: "Error resetting user password",
							});
						}
						res.json({
							message: `Great! Now you can login with your new password`,
						});
					});
				});
			}
		);
	}
};
