const {
	registerUser,
	activateUser,
	signinUser,
} = require("../controllers/auth.controller");
const { runValidation } = require("../validators");
const {
	userRegisterValidator,
	userSigninValidator,
} = require("../validators/auth.validator");
const router = require("express").Router();

// import validators

router.get("/test", (req, res) => {
	res.json({
		message: "Hello World, We are live !",
	});
});

router.post("/register", userRegisterValidator, runValidation, registerUser);
router.post("/activation", activateUser);
router.post("/login", userSigninValidator, runValidation, signinUser);

module.exports = router;
