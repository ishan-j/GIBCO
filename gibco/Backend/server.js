const express = require("express");
const mongoose = require("mongoose");
const pageRoutes = require("./Routes/PageRoutes");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
mongoose
mongoose
  .connect("mongodb://localhost:27017/GIBCO", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/pages", pageRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
