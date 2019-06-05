/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();


const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

// File to display handlebars html pages and make database queries on each page load

router.get("/", (req, res) => res.render("index"));

// A GET route for scraping the News website
router.get("/scrape", (req, res)=> {

  // First, we grab the body of the html with axios
  axios.get("https://www.freecodecamp.org/news/").then(response => {

    // Then load the response.data into cheerio and save it to $ for a shorthand selector
    const $ = cheerio.load(response.data);

    // Now, we grab every article tag, and do the following:
    $("div.post-feed article.post-card").each((i, element) => {
      //console.log(element);
      // Save an empty result object
      const result = {};
      // Add the text and href of every link, and save them as properties of the result object

      result.title = $(this).find("h2.post-card-title a").text();
      result.link = $(this).children("a").attr("href");

      console.log(`Article Title: ${result.title}`);
      console.log(`Article Link: ${result.link}`);


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
    // after scrape take to the view articles without comments page.
    res.redirect("/");
    console.log("Scrape completed")
  });
});


//Export the routes
module.exports = router;