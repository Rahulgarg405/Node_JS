const express = require("express");
const path = require("path");

const app = express();

// set the view engine :
app.set("view engine", "ejs");

// set the directory for the views :
app.set("views", path.join(__dirname, "views"));

const products = [
  {
    id: 1,
    name: "Product 1",
  },
  {
    id: 2,
    name: "Product 2",
  },
  {
    id: 3,
    name: "Product 3",
  },
];

app.get("/", (req, res) => {
  res.render("home", { title: "Home", products: products });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running  at PORT : ${PORT}`);
});
