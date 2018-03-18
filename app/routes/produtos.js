module.exports = function(app) {
	app.get('/produtos', function(req, resp, next){
		var connection = app.infra.connectionFactory();
		var produtosDao = new app.infra.produtosDao(connection);

		produtosDao.lista(function(err, result){
			if(err) {
				return next(err);
			}
			resp.format({
				html: function() {
					resp.render('produtos/lista', {lista:result});
				}, 
				json: function() {
					resp.json(result);
				}
			});
		});
		connection.end();			
	});

	app.get('/produtos/form', function(req, resp) {
		resp.render('produtos/form', {validationErrors:{}, produto:{}});
	});

	app.post('/produtos', function(req, resp) {

		var connection = app.infra.connectionFactory();
		var produtosDao = new app.infra.produtosDao(connection);
		var produto = req.body;

		req.assert('titulo', 'Título é obrigatório').notEmpty();
		req.assert('preco', 'Preço deve ser um número decimal').isFloat();

		var errors = req.validationErrors();
        if(errors){
            resp.format({
			    html: function(){
			        resp.status(400).render('produtos/form',{validationErrors:errors,produto:produto});
			    },
			    json: function(){
			        resp.status(400).json(errors);
			    }
			});
            return ;
        }
    	
    	produtosDao.save(produto, function(err, result) {
			resp.redirect('/produtos');
		});
		connection.end();        
	});

}