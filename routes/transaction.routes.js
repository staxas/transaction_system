var TransactionRequests = require('./lib/transaction.requests');

// transaction request methods
module.exports = [{
  method: 'POST',
  path: '/api/transactions',
  handler: TransactionRequests.postTransaction
},{
  method: 'PUT',
  path: '/api/transactions',
  handler: TransactionRequests.putTransaction
},{
  method: 'GET',
  path: '/api/transactions',
  handler: TransactionRequests.getTransactions
},{
  method: 'GET',
  path: '/api/transactions/{search}',
  handler: TransactionRequests.getTransactionsBy
},{
  method: 'GET',
  path: '/api/transactions/{search1}/{search2}',
  handler: TransactionRequests.getTransactionsByDouble
}];
