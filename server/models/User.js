const mongoose = require("mongoose");
const crypto = require("crypto");

// Schema
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 30,
			minlength: 3,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		hashed_password: {
			type: String,
			required: true,
			minlength: 6,
		},
		salt: String,
		role: {
			type: String,
			default: "user",
		},
		resetPasswordLink: {
			data: String,
			default: "",
		},
	},
	{ timestamps: true }
);

// Virtual
userSchema
	.virtual("password")
	.set(function (password) {
		this._password = password;
		this.salt = this.makeSalt();
		this.hashed_password = this.encrytPassword(password);
	})
	.get(function () {
		return this._password;
	});

// Methods
userSchema.methods = {
	authenticate: function (plainText) {
		return this.encrytPassword(plainText) === this.hashed_password;
	},
	encrytPassword: function (password) {
		if (!password) return "";
		try {
			return crypto
				.createHmac("sha1", this.salt)
				.update(password)
				.digest("hex");
		} catch (err) {
			console.log(err);
			return "";
		}
	},
	makeSalt: function () {
		return Math.round(new Date().valueOf() * Math.random()) + "";
	},
};

module.exports = mongoose.model("User", userSchema);
