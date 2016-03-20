#transaction_system

Allows users to create transactions, and either complete/commit or cancel these transactions. Transaction amounts on hold are removed from source user's account and placed in a waiting queue. On setting the transaction to either 'completed' or 'hold' these funds are either sent to the target user or returned to the source user.

Install dependancies with
##### npm install --save

Server and database URLs and ports: edit config.js accordingly.

###Endpoints and their methods:

##### POST /api/users

Create a new user

##### GET /api/users

Get database entry of all users

##### GET /api/users/{id}

If endpoint contains an id, a specific user will be searched for. If no query is given, a unique user id will be expected. If the query 'findBy=name' is added, a username is searched for in the MongoDB user database.

##### POST /api/transactions

Create a new transaction. Payload must contain 'sourceUser' and 'targetUser' properties (which are unique ids of user database entries) and an amount property.

##### PUT /api/transactions

Either complete or cancel an existing transaction on hold. If the payload property 'status' is 'completed', the transaction is commited and the funds are sent to the target user. If the payload property 'status' is 'canceled', funds are returned to the source user.

##### GET /api/transactions

Return all transactions

##### GET /api/transactions/{search}

If no query is given, or the query 'findBy=id' is given, search for a single transaction by its unique databse id. If the query 'findBy=sourcUser' is giver, where sourceUserId is the the unique database id of a user which is a data property of tranasction database entry, these entry/entries are returned. The same goes for the query 'findBy=targetUser' except now the target user property is being searched in the database. The 'findBy=status' query searched for transactions with a certain status, be it 'hold', 'completed' or 'canceled'.

##### GET /api/transactions/{search1}/{search2}

See above endpoint and request. Here, two possible search properties can be given. Example query: 'findBy=sourceUser&andBy=status'.
