const {
	registerUser,
	activateUser,
	signInUser,
	forgotPassword,
	resetPassword,
	googleLogin,
	githubLogin,
} = require("../controllers/auth.controller");
const { runValidation } = require("../middlewares/validators");
const {
	userRegisterValidator,
	userSigninValidator,
	forgotPasswordValidator,
	resetPasswordValidator,
} = require("../middlewares/validators/auth.validator");
const router = require("express").Router();

// import validators

router.get("/test", (req, res) => {
	res.json({
		message: "Hello World, We are live !",
	});
});

router.post("/register", userRegisterValidator, runValidation, registerUser);
router.post("/activation", activateUser);
router.post("/login", userSigninValidator, runValidation, signInUser);
router.put(
	"/password/forget",
	forgotPasswordValidator,
	runValidation,
	forgotPassword
);
router.put(
	"/password/reset",
	resetPasswordValidator,
	runValidation,
	resetPassword
);

router.post("/login/google", googleLogin);
router.post("/login/github", githubLogin);

module.exports = router;
