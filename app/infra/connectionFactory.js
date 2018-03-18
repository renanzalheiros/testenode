var mysql = require('mysql');
function createDbConnection(){
	return mysql.createConnection({
				host : 'localhost',
				user : 'root',
				password : 'DeadFish231',
				database: 'casadozalho_nodejs'
			});
};

module.exports = function() {
	return createDbConnection;
}