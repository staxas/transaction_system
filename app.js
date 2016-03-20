var Mongoose = require('mongoose');
var Hapi = require('hapi');

var Config = require('./config');

require('./models/user.model');
require('./models/transaction.model');

Mongoose.connect('mongodb://' + Config.db.username + ':' + Config.db.password + '@' + Config.db.host + ':' Config.db.port + '/' + Config.db.database);

var Server = new Hapi.Server();

Server.connection({
  host: Config.server.host,
  port: Config.server.port,
  routes: {
    cors: true
  }
});

Server.route(Routes);

Server.start(function () {
    console.log('Server running at:', Server.info.uri);
});
