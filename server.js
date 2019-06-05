/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("morgan");

const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const PORT = process.env.PORT || 3000;

// If deployed, use the deployed database. Otherwise use the local scraperDb database
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/scraperDb";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
// const apiRoutes = require("./controllers/apiRoutes.js");
// app.use(apiRoutes);

const htmlRoutes = require("./controllers/htmlRoutes.js");
app.use(htmlRoutes);

// Start the server
app.listen(PORT, ()=> {
  console.log("Server listening on: http://localhost:" + PORT);
});
