// class NotImplementedException extends Error {
// 	constructor() {
// 		super("Not Implement Exception");
// 	}
// }

// class ICrud extends NotImplementedException {
// 	create(item) {
// 		throw new NotImplementedException();
// 	}

// 	read(item) {
// 		throw new NotImplementedException();
// 	}

// 	update(id, item) {
// 		throw new NotImplementedException();
// 	}

// 	delete(id) {
// 		throw new NotImplementedException();
// 	}
// }

// class ContextStrategy extends ICrud {
// 	constructor(strategy) {
// 		super();
// 		this._database = strategy;
// 	}

// 	create(item) {
// 		return this._database.create(item);
// 	}

// 	read(item) {
// 		return this._database.read(item);
// 	}

// 	update(id, item) {
// 		return this._database.update(id, item);
// 	}

// 	delete(id) {
// 		return this._database.delete(id);
// 	}
// }

// class MongoDb extends ICrud {
// 	constructor() {
// 		super();
// 	}

// 	create(item) {
// 		console.log("Hero created in MongoDb");
// 	}
// }

// class Postgres extends ICrud {
// 	constructor() {
// 		super();
// 	}

// 	create(item) {
// 		console.log("Hero created in Postgres");
// 	}
// }

// const contextMongo = new ContextStrategy(new MongoDb());
// contextMongo.create();
// const contextPostgres = new ContextStrategy(new Postgres());
// contextPostgres.create();
