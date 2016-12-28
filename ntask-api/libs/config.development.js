import logger from "./logger.js";

module.exports = {
	database: "ntasks",
	username:"",
	password:"",
	params: {
		dialect:"sqlite",
		storage:"ntasks.sqlite",
		logging: (sql) => {
			logger.info(`[${new Date()}] ${sql}`);
		},
		define:{
			underscored:true
		},
	},
	jwtSecret: "Nta$K-AP1",
	jwtSession: {session:false},
	mongo: 'mongodb://localhost:27017/imoveis',
	neo4j: 'http://neo4j:c2a0r1l2@192.168.3.105:7474',
};