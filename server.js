const express = require("express");
const expressHandlebars = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/techscraperDb";
const routes = require("./routes");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// Connect to the Mongo DB
mongoose.connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, error => {
  console.log(error ? error : "Mongoose connected to the DB successfully!");
});
app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(routes);

// Start the server
app.listen(PORT, () => {
  console.log("Server listening on: http://localhost:" + PORT);
});
