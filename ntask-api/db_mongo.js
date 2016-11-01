import mongoose from "mongoose";

module.exports = app => {
		const config = app.libs.config;
		mongoose.connect(config.mongo);
		var ok = false;
		var mongo = mongoose.connection;
			console.log(mongo)
			mongo.on('error', console.error.bind(console.log("Mongo connection error:")));
			mongo.once('open', () => {
				ok = true;
			});
			console.log(ok)
		return mongoose;
};