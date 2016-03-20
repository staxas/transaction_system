#transaction_system

Allows users to create transactions, and either complete/commit or cancel these transactions. Transaction amounts on hold are removed from source user's account and placed in a waiting queue. On setting the transaction to either *completed* or *cancelled* these funds are either sent to the target user or returned to the source user. Requires MongoDB.

Install dependencies with
```bash
npm install --save
```

Server and database URLs and ports: edit *config.js* accordingly.

###Endpoints and their methods

##### POST /api/users

Create a new user. Returns new user database record.

##### GET /api/users

Returns database entries of all users.

##### GET /api/users/{id}

If endpoint contains an id, a specific user will be searched for. If no query is given, a unique user id will be expected. If the query *findBy=name* is added, a username is searched for in the MongoDB user database. Returns single user database record.

##### POST /api/transactions

Create a new transaction. Payload must contain *sourceUser* and *targetUser* properties (which are unique ids of user database entries) and an *amount* property. *amount* may not be more than the current amount in the user's account. Returns transaction database record.

##### PUT /api/transactions

Either complete or cancel an existing transaction on hold. Payload must contain property of *transaction_id* which is the unique id of a transaction database entry, and a property *status* which is either *complete* or *cancel*. If the payload property *status* is *complete*, the transaction is commited and the funds are sent to the target user. If the payload property *status* is *cancel*, funds are returned to the source user. Returns updated transaction database record.

##### GET /api/transactions

Return all transactions.

##### GET /api/transactions/{search}

If no query is given, or the query *findBy=id* is given, search for a single transaction by its unique database id. If the query *findBy=sourceUser* is given, where {search} is the the unique database id of a user which is a data property of tranasction database entry, this/these entry/entries are returned. The same goes for the query *findBy=targetUser* except now the target user property is being searched for in the database. The *findBy=status* query searches for transactions with a certain status, be it *hold*, *completed* or *cancelled*. Returns one or more transaction database records.

##### GET /api/transactions/{search1}/{search2}

See above endpoint and request. Here, two possible search properties can be given, allowing refined search capabilities. Example query: *findBy=sourceUser&andBy=status*. If no query is given, {search1} = *sourceUser* and {search2} = *targetUser*. Returns one or more transaction database records.
