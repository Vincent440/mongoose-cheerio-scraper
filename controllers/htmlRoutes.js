/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();

const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models/index.js");

router.get("/", (req, res) => res.render("index"));

// File to display handlebars html pages and make database queries on each page load


//Export the routes
module.exports = router;