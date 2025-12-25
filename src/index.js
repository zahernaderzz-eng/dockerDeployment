const express = require("express");
// const mongoose = require("mongoose");
const redis = require("redis");
const { Client } = require("pg");

//app init
const PORT = 4000;
const app = express();

//concet to redis
const REDIS_PORT = 6379;
const REDIS_HOST = "redis";
const client = redis.createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Redis Client connect.."));
client.connect();

//conect db
// const DB_USER = "root";
// const DB_PASSWORD = "example";
// const DB_PORT = 27017;
// const DB_HOST = "mongo";

// const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// mongoose
//   .connect(URI)
//   .then(() => console.log(`connect to db ...`))
//   .catch((err) => console.log("failt to connect to db", err));

const DB_USER = "root";
const DB_PASSWORD = "example";
const DB_PORT = 5432;
const DB_HOST = "postgres";

const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
const clientdb = new Client({ connectionString: URI });
clientdb
  .connect()
  .then(() => console.log(`connect to db pg...`))
  .catch((err) => console.log("faild to connect to db", err));

app.get("/", (req, res, next) => {
  client.set("products", "products....");
  res.send("<h1> Hello zaher dasd  </h1>");
});
app.get("/data", async (req, res, next) => {
  const products = await client.get("products");
  res.send(`<h1> Hello zaher dasd  </h1><h2>${products}</h2>`);
});

app.listen(PORT, () => console.log(`app is up and running on port :${PORT}`));
