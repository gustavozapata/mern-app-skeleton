const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productRouter = require("./routes/productRoutes");
const itemRouter = require("./routes/itemRoutes");

const app = express();

//MIDDLEWARE
app.use(morgan("dev")); //logs all the end-point calls
app.use(cors()); //allows *
app.use(express.static("public")); //serves files (html, css, js) in the public folder
app.use(express.json()); //allows us to access the body of the request

//ROUTES - MOUNTING THE ROUTERS
app.use("/api/v1/products", productRouter);
app.use("/api/v1/items", itemRouter);

module.exports = app;
