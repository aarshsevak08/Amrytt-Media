const express = require("express");
const app = express();

app.use(express.json());
const connectDB = require("./db/db");
const env = require("dotenv");
const { report } = require("./router/auth");
const router = require("./router/auth");
env.config();
const PORT = process.env.PORT;
connectDB();

app.use("/api/auth",require("./router/auth"));
app.use("/api/category",require("./router/category"));
app.use("/api/product",require("./router/product"));

app.listen(PORT, () => {
  console.log(`Server run on PORT : ${PORT}`);
});
