const {
	getUser,
	updateUser,
	getUserById,
} = require("../controllers/user.controller");
const { signInCheck, adminCheck } = require("../middlewares/checkPriviledge.middleware");

const router = require("express").Router();

router.get("/user", adminCheck, getUser);
router.get("/:id", signInCheck, getUserById);
router.put("/update", signInCheck, updateUser);
router.put("/admin/update", signInCheck, adminCheck, updateUser); // faltu

module.exports = router;
