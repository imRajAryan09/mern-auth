const User = require("../models/User");
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const { emailHtml } = require("../utils/email");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
			{ expiresIn: "1d" }
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

exports.signinUser = async (req, res) => {
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
