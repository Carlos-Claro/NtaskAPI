module.exports = app => {
	const Users = app.db.models.Users;

	app.route("/user")
		.all(app.auth.authenticate())
		/**
		* @api {get} /user Exibe usuário autenticado
		* @apiGroup Usuário
		* @apiHeader {String} Authorization Token de usuário
		* @apiHeaderExample {json} Header
		*
		{"Authorization": "JWT xyz.abc.123.hgf"}
		* @apiSuccess {Number} id Id de registro
		* @apiSuccess {String} name Nome
		* @apiSuccess {String} email Email
		* @apiSuccessExample {json} Sucesso
		*
		HTTP/1.1 200 OK
		*
		{
		*
		"id": 1,
		*
		"name": "John Connor",
		*
		"email": "john@connor.net"
		*
		}
		* @apiErrorExample {json} Erro de consulta
		*
		HTTP/1.1 412 Precondition Failed
		*/
		.get( (req,res) => {
			Users.findById(req.user.id, {
					atributes: ["id","name","email"]
				})
				.then( result => res.json(result))
				.catch(error => {
					res.status(412).json({msg:error.message});
				});
			
		})
		/**
		* @api {delete} /user Exclui usuário autenticado
		* @apiGroup Usuário
		* @apiHeader {String} Authorization Token de usuário
		* @apiHeaderExample {json} Header
			{"Authorization": "JWT xyz.abc.123.hgf"}
		* @apiSuccessExample {json} Sucesso
		* 	HTTP/1.1 204 No Content
		* @apiErrorExample {json} Erro na exclusão
		*	HTTP/1.1 412 Precondition Failed
		*/
		.delete( (req,res) => {
			Users.destroy({where: {id: req.user.id}})
				.then(result => res.sendStatus(204))
				.catch(error => {
					res.status(412).json({msg:error.message});
				});
		});
		/**
		 * @api {method} path [title]
		 */
		app.post("/users",(req,res) => {
			Users.create(req.body)
				.then(result => res.json(result))
				.catch(error => {
					res.status(412).json({msg:error.message});

				});
		});

};