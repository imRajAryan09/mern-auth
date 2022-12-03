const User = require("../models/User");

exports.getUser = async (req, res) => {
	const user = await User.find({}).select("-hashed_password -salt");
	res.json(user);
};

exports.getUserById = async (req, res) => {
	const userId = req.params.id;
	User.findById(userId).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "This user does not exist",
			});
		}
		user.hashed_password = undefined;
		user.salt = undefined;
		return res.json(user);
	});
};

exports.updateUser = async (req, res) => {
	const { name, password } = req.body;
	User.findById(req.auth._id, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		if (!name) {
			return res.status(400).json({
				error: "Name is required",
			});
		} else {
			user.name = name;
		}
		if (password) {
			if (password.length < 6) {
				return res.status(400).json({
					error: "Password should be min 6 characters long",
				});
			} else {
				user.password = password;
			}
		}
		user.save((err, updatedUser) => {
			if (err) {
				console.log("USER UPDATE ERROR", err);
				return res.status(400).json({
					error: "User update failed",
				});
			}
			updatedUser.hashed_password = undefined;
			updatedUser.salt = undefined;
			return res.json(updatedUser);
		});
	});
};
