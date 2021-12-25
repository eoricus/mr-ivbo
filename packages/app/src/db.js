const { MongoClient } = require("mongodb");

const env = require("../../../env.json");
const mongoClient = new MongoClient(env.databaseURL);

(async () => {
  await mongoClient.connect();
})();

const tokens = mongoClient.db("mr-ivbo").collection("tokens");
const members = mongoClient.db("mr-ivbo").collection("members");
const competitions = mongoClient.db("mr-ivbo").collection("competitions");

module.exports = { tokens, members, competitions};
