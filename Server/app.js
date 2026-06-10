const express = require("express");
const cors = require("cors");
require("dotenv").config();

const githubRoutes = require("./Routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/github", githubRoutes);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
  res.send("GitHub Repo Explorer API is running");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});