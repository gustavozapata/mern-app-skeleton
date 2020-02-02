const fs = require("fs");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.static("public")); //serves files (html, css, js) in the public folder
app.use(express.json());

const items = JSON.parse(fs.readFileSync(`${__dirname}/api/data.json`));

app.get("/", (req, res) => {
  res.send("*** server running ***");
});

//METODO BASICO
// app.get("/db/products", (req, res) => {
//   conn
//     .collection("products")
//     .find({})
//     .toArray((err, db_res) => {
//       res.send(db_res);
//     });
// });

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
const getProducts = (req, res) => {
  conn
    .collection("products")
    .find({})
    .toArray((err, db_res) => {
      res.send(db_res);
    });
};

//insertOne
const addProduct = (req, res) => {
  conn.collection("products").insertOne(req.body, () => {
    res.json({
      api: "insert one product",
      status: 200,
      description: "inserted a product successfully"
    });
  });
};

//witeteAll
const insertProducts = (req, res) => {
  const data = require("./data/db");
  conn.collection("products").insertMany(data, () => {
    res.json({
      api: "write all products",
      status: 200,
      description: "wrote all products successfully"
    });
  });
};

//deleteAll
const deleteProducts = (req, res) => {
  conn.collection("products").deleteMany({}, () => {
    res.json({
      api: "delete all products",
      status: 200,
      description: "deleted all products successfully"
    });
  });
};

//deleteOne
const deleteProduct = (req, res) => {
  conn.collection("products").deleteOne({ name: req.params.id }, () => {
    res.json({
      api: "delete one product",
      status: 200,
      description: "deleted a product successfully"
    });
  });
};

app
  .route("/db/products")
  .get(getProducts)
  .post(insertProducts)
  .delete(deleteProducts);

app
  .route("/db/products/:id")
  .post(addProduct)
  .delete(deleteProduct);

//API
app.get("/api/items", (req, res) => {
  res.json({
    status: "success",
    results: items.length,
    data: { items }
  });
});
//EXPRESS

app.listen(port, () => console.log(`*** Server running on port ${port} ***`));

module.exports = app;
