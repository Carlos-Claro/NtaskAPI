//import imoveisMongoModel from "../models/mongo/imoveis.js";
module.exports = app => {
	const config = app.libs.config;
		
	app.route("/imoveis/qtde")
		//.all(app.auth.authenticate())
		.post((req,res) => {
			console.log('post qtde',req.body);
			var body = {
	 					"imoveis_tipos_link":req.body.imoveis_tipos_link, 
	 					"latitude": {$lt : 0},
	 					"location":{$near:[req.body.longitude,req.body.latitude]}
		 				};
			var limit = 10
			const imoveis = app.db.mongo.collection('imoveis');
			imoveis.count(body).then((count) => {
				res.json(count);	
			});
		});
		app.route("/imoveis/itens")
		//.all(app.auth.authenticate())
		.get((req,res) => {
				console.log('get',req.body);

			var body = {
	 					"imoveis_tipos_link":"apartamento", 
	 					"id_cidade":"1",
	 					"latitude": {$lt : 0},
	 					"location":{$near:[-49.179251,-25.547125]}
		 				};
			var offset, limit;
			var limit = 20
			const imoveis = app.db.mongo.collection('imoveis');
			
			imoveis.count(body).then((count) => {
			
					imoveis.find(body).limit(limit).sort({"ordem":-1}).toArray((err,itens) => {
			
							var retorno = {};
							retorno.qtde = count;
							retorno.itens = itens;
							res.json(retorno);	
							
					});

			 					
			});
		}).post((req,res) => {
			console.log('post itens',req.body);
	 					// "id_cidade":"1",
			var body = {
	 					"latitude": {$lt : 0},
	 					"location":{$near:[req.body.longitude,req.body.latitude]}
		 				};
 				if ( req.body.imoveis_tipos_link != undefined )
 				{
 					body.imoveis_tipos_link = req.body.imoveis_tipos_link;
 				}
			var offset, limit;
			var limit = 10
			const imoveis = app.db.mongo.collection('imoveis');
					imoveis.find(body).limit(limit).sort({"ordem":-1}).toArray((err,itens) => {
							res.json(itens);	
							
					});

			 					
		})
		;
		
};