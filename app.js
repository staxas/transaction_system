var mongoose = require('mongoose');
var Hapi = require('hapi');
var argv = require('minimist')(process.argv.slice(2));
var colors = require('colors');

var UserRequests = require('./lib/user.requests');
var TransactionRequests = require('./lib/transaction.requests');

require('./models/user.model');
require('./models/transaction.model');
require('./lib/_line.js');

mongoose.connect('mongodb://localhost/transaction_system');

var server = new Hapi.Server();

server.connection({
  port: 3000,
  host: '127.0.0.1',
  routes: {
    cors: true
  }
});

// user request methods
server.route({
  method: 'POST',
  path: '/api/users',
  handler: UserRequests.postUser
});

server.route({
  method: 'GET',
  path: '/api/users',
  handler: UserRequests.getUsers
});

server.route({
  method: 'GET',
  path: '/api/users/{search}',
  handler: UserRequests.getUser
});

// transaction request methods
server.route({
  method: 'POST',
  path: '/api/transactions',
  handler: TransactionRequests.postTransaction
});

// transaction request methods
server.route({
  method: 'PUT',
  path: '/api/transactions',
  handler: TransactionRequests.putTransaction
});

server.route({
  method: 'GET',
  path: '/api/transactions',
  handler: TransactionRequests.getTransactions
});

server.route({
  method: 'GET',
  path: '/api/transactions/{search}',
  handler: TransactionRequests.getTransactionsBy
});

server.route({
  method: 'GET',
  path: '/api/transactions/{search1}/{search2}',
  handler: TransactionRequests.getTransactionsByDouble
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});


console.log(colors.random('Lees ook mijn comment op lijn ' + (__line + 1) + ' & ' + (__line + 2) + ' in ' + module.filename ) );
// hier een voorbeeld hoe je argumenten op de commandline kan gebruiken wanneer je node of nodemon app.js start
// nodemon app.js --cmd=transfer --amount=1 --from=5694d6da0095fb1c23d910c2 --to=5694d6da0095fb1c23d910c2 --status=hold
if(argv.cmd &&
   argv.cmd == 'transfer' &&
   argv.from &&
   argv.to &&
   argv.amount &&
   argv.amount.length
  ){

  var request = {};

  request.payload = {
    sourceUser : argv.from,
    targetUser : argv.to,
    amount : argv.amount,
    status : argv.status
  };

  TransactionRequests.postTransaction(request, function (resp) {
    console.log(resp);
  });

}
