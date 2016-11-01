import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import mongodb from "mongodb";
let db = null;

module.exports = app => {
	if ( ! db){
		const config = app.libs.config;
		const sequelize = new Sequelize(
				config.database, 
				config.username,
				config.password,
				config.params
			);


		db = { 
			sequelize, 
			Sequelize, 
			models:{},
			
		};
		mongodb.MongoClient.connect(app.libs.config.mongo, (err, database) => {
			if (err) return console.log(err)
				db.mongo = database
		})	
		
		const dir = path.join(__dirname,"models/sequelize");
		fs.readdirSync(dir).forEach(file => {
			const modelDir = path.join(dir,file);
			const model = sequelize.import(modelDir);
			db.models[model.name] = model;
		});

		
		
		Object.keys(db.models).forEach(key => {
			db.models[key].associate(db.models);
		});
	}
	return db;
};