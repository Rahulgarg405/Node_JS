const express = require("express");

const app = express();

const requestTimeLogger = (req, res, next) => {
  const timeStamp = new Date().toISOString();
  console.log(
    `Request received at ${timeStamp} from ${req.method} to ${req.url}`
  );
  next();
};

app.use(requestTimeLogger);

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
