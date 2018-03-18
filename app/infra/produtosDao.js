function ProdutosDao(connection) {
	this._connection = connection;
}

ProdutosDao.prototype.lista = function(callback) {
	this._connection.query('select * from produtos', callback);
}

ProdutosDao.prototype.save = function(produto, callback) {
	this._connection.query('insert into produtos set ?', produto, callback);
}

module.exports = function() {
	return ProdutosDao;
}