
	

const imoveisMongoModel = {
	adicionar: (app) => {},
	editar: (app) => {},
	count: (app) => {
		var resposta = 0;
			app.db.mongo.collection('imoveis').count({
							"imoveis_tipos_link":"apartamento", 
							"id_cidade":"1", 
							"latitude": {$lte:0}
							
							} ).then((count)=>{
								resposta.qtde = count;
							});
		return resposta;
	},
	find: (app) => {
			var resposta = {};
			app.db.mongo.collection('imoveis').find({
							"imoveis_tipos_link":"apartamento", 
							"id_cidade":"1",
							"latitude": {$lte:0}
							} ).toArray((err,result)=>{
								resposta.itens = result;
			});
		return resposta;
	},
};
module.exports = imoveisMongoModel;
	// // var Schema = app.db.mongoose.Schema;
	// // var Imoveis = new Schema({
	// // 		_id: {
	// // 			type: DataType.INTEGER,
	// // 			primaryKey: true,
	// // 			autoIncrement:true
	// // 		},
	// // 		nome: {
	// // 			type: DataType.STRING,
	// // 			allowNull: false,
	// // 		},
	// // 		preco: {
	// // 			type: DataType.DOUBLE,
	// // 			allowNull: false,
	// // 			defaultValue: false
	// // 		} 
	// // 	} 
		
	// );
	// return Imoveis;