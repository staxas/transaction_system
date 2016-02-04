var mongoose = require('mongoose');

var transactionSchema = mongoose.Schema({
  sourceUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  targetUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: Number,
  status: String,
  creationDate: {
    type: Date,
    default: new Date()
  }
});

var Transaction = mongoose.model('Transaction', transactionSchema);

function userExists(userId, callback) {
  var sourceUsers = mongoose.models.User.find({
    _id: userId
  }).count();

  sourceUsers.exec(function(err, docs) {
    return callback(err, docs);
  });
}

transactionSchema.pre('save', function(next, done) {
  var self = this;
  userExists(self.sourceUser, function(err, result) {
    // console.log(err, result);
    if (!result) {
      console.error('Source user id ' + self.sourceUser + ' not found.')
      done();
    } else {
      next();
    }
  });
})

transactionSchema.pre('save', function(next, done) {
  var self = this;
  userExists(self.targetUser, function(err, result) {
    // console.log(err, result);
    if (!result) {
      console.error('Target user id ' + self.sourceUser + ' not found.')
      done();
    } else {
      next();
    }
  });
})

function checkUserWallet(userId, callback) {
  var sourceUserWallet = mongoose.models.User.findOne({
    _id: userId
  });

  sourceUserWallet.exec(function(err, docs) {
    callback(docs);
  })
}

transactionSchema.pre('save', function(next, done) {
  var self = this;

  checkUserWallet(self.sourceUser, function(result) {
    if (self.amount > result.wallet) {
      console.error('Not enough funds to complete transaction for source user ' + self.sourceUser);
      done();
    } else {
      next();
    };
  })
})

transactionSchema.post('save', function(doc) {
  var self = this;
  console.log(doc);
  checkUserWallet(self.sourceUser, function(result) {
    result.wallet = result.wallet - self.amount;
    console.log(result);
    result.save(function(err, doc) {
      if (err) {
        // how to return on error????
        console.error(err);
      }
    });
  })
})
