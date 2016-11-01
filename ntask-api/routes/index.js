module.exports = app => {
	/**
	* @api {get} / API status
	* @apiGroup Status
	* @apiSuccess {String} status mensagem de status da API
	@apiSuccessExample {json} Sucesso
	*	HTTP/1.1 200 OK
	* 	{"status": "Ntask API"}
	*/
	app.get("/", (req,res) => {
		res.json({status:"NTasks API"});
	});
};