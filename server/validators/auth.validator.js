const { check } = require("express-validator");

exports.userRegisterValidator = [
	check("name").not().isEmpty().withMessage("Name is required"),
	check("name")
		.isLength({ min: 3 })
		.withMessage("Name cannot be less than 3 characters"),

	check("email").isEmail().withMessage("Must be a valid Email"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be atleast 6 characters long"),
];

exports.userSigninValidator = [
	check("email").isEmail().withMessage("Must be a valid Email"),
	check("password")
		.isLength({ min: 6 })
		.withMessage("Password must be atleast 6 characters long"),
];