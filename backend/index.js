const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const postsRoute = require("./Routes/posts");

app.use(express.json());
app.use(cors());

// MIDDLEWARE
app.use("/tables", postsRoute);
app.use(express.json());

// ROUTES
app.get("/", function(req, res) {
  setTimeout(() => {
    res.send("We are on air");
  }, 2500);
});

app.delete("/campaigns/:id", function(req, res) {
  const index = campaigns.findIndex(c => c.id === parseInt(req.params.id));
  if (index > -1) {
    campaigns.splice(index, 1);
  }
  res.send(campaigns);
});

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useCreateIndex: true },
  () => console.log("conected to DB")
);

app.listen(3000);
