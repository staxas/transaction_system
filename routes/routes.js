var TransactionRoutes = require('./transaction.routes');
var UserRoutes = require('./user.routes');

module.exports = [].concat(TransactionRoutes, UserRoutes)
