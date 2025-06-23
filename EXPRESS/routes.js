const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

// get all products :

app.get("/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Product-1",
    },
    {
      id: 2,
      name: "Product-2",
    },
    {
      id: 3,
      name: "Product-3",
    },
  ];
  res.json(products);
});

// getting a single product :

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    {
      id: 1,
      name: "Product-1",
    },
    {
      id: 2,
      name: "Product-2",
    },
    {
      id: 3,
      name: "Product-3",
    },
  ];

  const product = products.find((product) => product.id === productId);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json("Product not found");
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on PORT : ${port}`);
});
