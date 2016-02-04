var mongoose = require('mongoose');

module.exports.postUser = function(request, reply) {
  var newUser = new mongoose.models.User(request.payload);

  newUser.save(function(err, doc) {
    if (!err) {
      reply(doc);

    } else {
      reply(err);
    }
  });
}

module.exports.getUsers = function(request, reply) {

  var users = mongoose.models.User.find({});

  users.exec(function(err, docs) {

    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
}

module.exports.getUser = function(request, reply) {

  if (request.query && request.query.findBy) {

    if (request.query.findBy == 'name') {
      var user = mongoose.models.User.findOne({
        name: request.params.search
      });
    } else {
      var user = mongoose.models.User.findOne({
        _id: request.params.search
      });
    }
  } else {
    var user = mongoose.models.User.findOne({
      _id: request.params.search
    });
  }

  user.exec(function(err, docs) {

    if (!err) {
      return reply(docs);
    } else {
      return reply(err);
    }
  });
}
