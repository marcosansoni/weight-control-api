const MongoDbUser = process.env.MONGODB_USER;
const MongoDbPassword = process.env.MONGODB_PASSWORD;
const MongoDbCluster = process.env.MONGODB_CLUSTER;
const MongoDbCollection = process.env.MONGODB_COLLECTION;
const TokenSecret = process.env.TOKEN_SECRET;
const Port = process.env.PORT;

module.exports = {
  MongoDbUser,
  MongoDbCluster,
  MongoDbPassword,
  MongoDbCollection,
  TokenSecret,
  Port
}
