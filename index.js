const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello GCP Computer");
});

app.listen(80, () => {
  console.log("App listening on Port 80");
});
