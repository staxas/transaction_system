var mongoose = require('mongoose');
var colors = require('colors');
require('./_line.js');

function updateWallet(doc, user_id, callback) {

  var user = mongoose.models.User.findOneAndUpdate({
    _id: user_id
  }, {
    $inc: {
      wallet: doc.amount
    }
  }, {
    new: true
  });

  user.exec(function(err, doc) {
    if (!err) {
      callback(null, doc);
    } else {
      callback(err, null);
    }
  })
}

module.exports.postTransaction = function(request, reply) {
  var newTransaction = new mongoose.models.Transaction(request.payload);

  newTransaction.save(function(err, doc) {
    if (!err) {
      return reply(doc);
    } else {
      return reply(err);
    }
  });
}

module.exports.putTransaction = function(request, reply) {

  var p = request.payload;
  var update;

  if (p.status == 'completed') {
    update = {
      $set: {
        status: 'completed'
      }
    };
  } else if (p.status == 'canceled') {
    update = {
      $set: {
        status: 'canceled'
      }
    };
  }

  var transaction = mongoose.models.Transaction.findOneAndUpdate({
    _id: request.payload.transaction_id,
    status: 'hold'
  }, update, {
    new: true
  });

  transaction.exec(function(err, doc) {
    if (doc.status == "completed") {
      updateWallet(doc, doc.targetUser,
        function(err, doc) {
          if (!err) {
            reply(doc);
          } else {
            reply(err);
          }
        });
    } else if (doc.status == "canceled") {
      updateWallet(doc, doc.sourceUser,
        function(err, doc) {
          if (!err) {
            reply(doc);
          } else {
            reply(err);
          }
        });
    } else if(err) {
      reply(err);
    }
  })
}

module.exports.getTransactions = function(request, reply) {

  var transaction = mongoose.models.Transaction.find({});

  transaction.exec(function(err, docs) {

    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
}

module.exports.getTransactionsBy = function(request, reply) {

  if (request.query && request.query.findBy) {
    if (request.query.findBy == 'sourceUser') {
      var transactions = mongoose.models.Transaction.find({
        sourceUser: request.params.search
      });
    }
    if (request.query.findBy == 'targetUser') {
      var transactions = mongoose.models.Transaction.find({
        targetUser: request.params.search
      });
    }
    if (request.query.findBy == 'status') {
      var transactions = mongoose.models.Transaction.find({
        status: request.params.search
      });
    }
    if (args.query.findBy == 'id') {
      var transactions = mongoose.models.Transaction.findOne({
        _id: request.params.search
      });
    } else {
      var transactions = mongoose.models.Transaction.findOne({
        _id: request.params.search
      });
    }
  } else {
    var transactions = mongoose.models.Transaction.findOne({
      _id: request.params.search
    });
  }

  transactions.exec(function(err, docs) {

    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
}

module.exports.getTransactionsByDouble = function(request, reply) {

  if (request.query && request.query.findBy && request.query.andBy) {
    if (request.query.findBy == 'sourceUser' && request.query.andBy == 'targetUser') {
      var transactions = mongoose.models.Transaction.find({
        sourceUser: request.params.search1,
        targetUser: request.params.search2
      });
    } else if (request.query.findBy == 'sourceUser' && request.query.andBy == 'status') {
      var transactions = mongoose.models.Transaction.find({
        sourceUser: request.params.search1,
        status: request.params.search2
      });
    } else if (request.query.findBy == 'targetUser' && request.query.andBy == 'sourceUser') {
      var transactions = mongoose.models.Transaction.find({
        targetUser: request.params.search1,
        sourceUser: request.params.search2
      });
    } else if (request.query.findBy == 'targetUser' && request.query.andBy == 'status') {
      var transactions = mongoose.models.Transaction.find({
        targetUser: request.params.search1,
        status: request.params.search2
      });
    } else if (request.query.findBy == 'status' && request.query.andBy == 'sourceUser') {
      var transactions = mongoose.models.Transaction.find({
        status: request.params.search1,
        sourceUser: request.params.search2
      });
    } else if (request.query.findBy == 'status' && request.query.andBy == 'targetUser') {
      var transactions = mongoose.models.Transaction.find({
        status: request.params.search1,
        targetUser: request.params.search2
      });
    } else {
      var transactions = mongoose.models.Transaction.find({
        sourceUser: request.params.search1,
        targetUser: request.params.search2
      });
    }
  } else {
    var transactions = mongoose.models.Transaction.find({
      sourceUser: request.params.search1,
      targetUser: request.params.search2
    });
  }

  transactions.exec(function(err, docs) {
    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
}

// als je veel 'if else' hebt is het beter om een switch() te gebruiken!
// met de if/else hierboven is dat niet handig (maar toch handig om te weten)
console.log(colors.random('Lees mijn comment op lijn ' + (__line - 2) + ' & ' + (__line - 1) + ' in ' + module.filename ) );

// hier heb je een voorbeeld met een integer;
var value = 10;

switch(value){
  case 10:
    console.log(value + ' is tien');
    break;
  case 20:
    console.log(value + ' is twintig');
    break;
  case 30:
    console.log(value + ' is dertig');
  default:
    statements_def
    break;
}

// hier een voorbeeld met een string
var value = 'tien';

switch(value){
  case 'tien':
    console.log(value + ' is 10');
    break;
  case 'twintig':
    console.log(value + ' is 20');
    break;
  case 'dertig':
    console.log(value + ' is 30');
  default:
    statements_def
    break;
}