const express = require("express");

const app = express();

// applicatoin level settings :
// like setting view engine :
app.set("view engine", "ejs");

// routing :

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.post("/api/data", (req, res) => {
  res.json({
    messsage: "Data Received",
    data: req.body,
  });
});
