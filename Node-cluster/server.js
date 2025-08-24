const cluster = require("cluster");
const os = require("os");
const express = require("express");

const totalCPUs = os.availableParallelism();

// console.log(totalCPUs);

if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  const PORT = 3000;

  app.get("/", (req, res) => {
    return res.json(`Hello from Server with process id : ${process.pid}`);
  });

  app.listen(PORT, () => {
    console.log(`Server listening at PORT : ${PORT}`);
  });
}
