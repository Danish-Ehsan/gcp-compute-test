const express = require("express");
const app = express();
const createDatabasePool = require("./config/database");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(express.json());

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
console.log(`DB_HOST = ${process.env.DB_HOST}`);

(async () => {
  try {
    dbPool = await createDatabasePool();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello GCP Computer");
});

app.get("/users", async (req, res) => {
  try {
    const users = await dbPool.query("SELECT * FROM users;");
    res.json(users.rows);
  } catch (err) {
    console.log(err);
    res.status(500).next(err);
  }
});

app.get("/error", (req, res) => {
  (async () => {
    console.log("throwing error");
    throw new Error("This is an custom error");
  })();
});

app.listen(80, () => {
  console.log("App listening on Port 80");
});
