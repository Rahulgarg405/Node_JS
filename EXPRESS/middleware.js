const express = require("express");

const app = express();

const myMiddleware = (req, res, next) => {
  console.log("Middleware will run every time a request is made");
  next();
};

app.use(myMiddleware);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/about", (req, res) => {
  res.send("About Page");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running  at PORT : ${PORT}`);
});
