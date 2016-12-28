//import imoveisMongoModel from "../models/mongo/imoveis.js";
module.exports = app => {
	const config = app.libs.config;
		
	app.route("/relacoes/pesquisa")
		//.all(app.auth.authenticate())
		.get((req,res) => {
			console.log('get',req.body);
			const neo = app.db.neo4j;
			neo.cypher({
			    query: 'MATCH (p:Person) RETURN p',
			    params: {
			        since: 2009,
			    },
			}, (err, results) => {
			    if (err) throw err;
			    var result = results[0];
			    if (!result) {
			        console.log('No user found.');
			    } else {
			        var user = result['p'];
			        console.log(JSON.stringify(user, null, 4));
			    }
			});
		})
		.post((req,res) => {
			console.log('get',req.body);
			const neo = app.db.neo4j;
			neo.cypher({
			    query: 'MATCH (p:Person) RETURN p',
			    params: {
			        since: 2009,
			    },
			}, (err, results) => {
			    if (err) throw err;
			    var result = results[0];
			    if (!result) {
			        console.log('No user found.');
			    } else {
			        var user = result['p'];
			        console.log(JSON.stringify(user, null, 4));
			    }
			});
			 					
		})
		;
		
};