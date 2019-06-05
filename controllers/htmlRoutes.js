/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();


const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

// File to display handlebars html pages and make database queries on each page load

router.get("/", (req, res) => res.render("index"));

// A GET route for scraping the IFLscience/technology website
router.get("/scrape", (req, res)=> {

  // First, we grab the body of the html with axios
  axios.get("https://www.iflscience.com/technology/").then(response => {

    // Then load that into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every article tag, and do the following:
    $("article.post.technology div.inner h3.title").each((i, element) => {
      // Save an empty result object
      const result = {};
      // Add the text and href of every link, and save them as properties of the result object

      result.title = $(this).children("a").text();
      console.log(`Article TITLE: ${result.title}`);

      debugger;

      // Create a new Article using the `result` object built from scraping
      // db.Article.create(result)
      // .then(dbArticle => {
      //     // View the added result in the console
      //     console.log(dbArticle);
      // })
      // .catch(err => {
      //     // If an error occurred, log it
      //     console.log(err);
      // });

    });

    // Send a message to the client
    res.send("Scrape of IFLS Complete");
  });
});


//Export the routes
module.exports = router;