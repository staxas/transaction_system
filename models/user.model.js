var mongoose = require('mongoose');

var userSchema = mongoose.Schema ({
  name : String,
  wallet: Number
  // transactions: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Transaction'} ]
});

var User = mongoose.model('User', userSchema);
