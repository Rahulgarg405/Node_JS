require("dotenv").config();
const express = require("express");
const connectToDb = require("./database/db");
const authRoutes = require("./routes/auth-routes");

// QZTdjBZxEsV6elCY

const app = express();

const PORT = process.env.PORT || 3000;

connectToDb();

// Midllewares :
app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});
