module.exports = function(app) {
	app.get("/promocoes/form", function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDao = new app.infra.produtosDao(connection);

		produtosDao.lista(function(erros, resultado) {
			res.render('promocoes/form', {lista:resultado});
		});
		connection.end();
	});

	app.post('/promocoes', function(req, resp) {
		var promocao = req.body;
		app.get('io').emmit('novaPromocao', promocao);
		resp.redirect('promocoes/form');
	});
}