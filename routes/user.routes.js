var UserRequests = require('./lib/user.requests');

// user request methods
module.exports = [{
  method: 'POST',
  path: '/api/users',
  handler: UserRequests.postUser
},{
  method: 'GET',
  path: '/api/users',
  handler: UserRequests.getUsers
},{
  method: 'GET',
  path: '/api/users/{search}',
  handler: UserRequests.getUser
}];
