const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello GCP Computer");
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
