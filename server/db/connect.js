const mongoose = require("mongoose");

const connect = async (uri) => {
	return await mongoose
		.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => console.log("Connected to DB"))
		.catch((err) => console.log(err));
};

module.exports = connect;
