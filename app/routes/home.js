module.exports = function(app) {
	app.get('/', function(req, res) {
		var connection = app.infra.connectionFactory();
		var produtosDao = new app.infra.produtosDao(connection);
		produtosDao.lista(function(erros, resultados) {
			res.render('home/index', {livros:resultados});
		});
	});
}