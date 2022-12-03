const { expressjwt: jwt } = require("express-jwt");
const User = require("../models/User");
exports.signInCheck = jwt({
	secret: process.env.JWT_SECRET, // req.user
	algorithms: ["HS256"],
	useProperty: "auth",
});

// todo - add error handling to handle if no token is provided

exports.adminCheck = (req, res, next) => {
	User.findById({ _id: req.auth._id }).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User not found",
			});
		}
		if (user.role !== "admin") {
			return res.status(403).json({
				error: "Admin resource. Access denied",
			});
		}
		req.profile = user;
		next();
	});
};
