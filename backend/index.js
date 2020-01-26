const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.static("public")); //serves files (html, css, js) in the public folder

app.get("/", (req, res) => {
  res.send("*** server running ***");
});

//DATABASE
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("*** Connected to MongoDB ***"))
  .catch(error => console.log(error));
const conn = mongoose.connection;
//DATABASE

//EXPRESS
//getAll
app.get("/db/getAll", (req, res) => {
  conn
    .collection("products")
    .find({})
    .toArray((err, db_res) => {
      res.send(db_res);
    });
});

//witeteAll
app.get("/db/writeAll", (req, res) => {
  const data = require("./routes/db");
  conn.collection("products").insertMany(data, () => {
    res.send({
      api: "writeAll",
      status: 200,
      description: "wrote all products successfully"
    });
  });
});

//deleteAll
app.get("/db/deleteAll", (req, res) => {
  conn.collection("products").deleteMany({}, () => {
    res.send({
      api: "deleteAll",
      status: 200,
      description: "deleted all products successfully"
    });
  });
});
//EXPRESS

app.listen(port, () => console.log(`*** Server running on port ${port} ***`));

module.exports = app;
