/* eslint-disable no-console */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/index.js");

// File to display handlebars html pages and make database queries on each page load


router.get("/", (req, res) =>{
  db.Article.find({}).then( articles =>{
    res.render( "index" ,{ articles })
  }).catch((err) => {
    res.status(404).json(err);
  });
});

router.get("/commented", (req, res) =>{
  db.Article.find({ hasComment: true })
  .populate("Comment")
  .then( articles =>{
    res.render( "commented-articles" ,{ articles })
  }).catch(err => res.status(404).json(err));

});


router.get("/scrape", (req, res)=> {
  // First, we grab the body of the html with axios
  axios.get("https://www.freecodecamp.org/news/").then(response => {

    const $ = cheerio.load(response.data);
    // Now, we grab every article tag, and do the following:
    $("div.post-feed article.post-card").each((i, element) => {
      //empty object to store each article in before pushing to Database
      const result = {}
      result.title = $(element).find("h2.post-card-title a").text().trim();
      result.link = "https://www.freecodecamp.org" + $(element).children("a").attr("href");
      result.imgSrc = $(element).find("img").attr("src");
      result.author = $(element).find("footer a.meta-item").text();
      // Some are hosted by a CDN well others are relative filepaths.
      // So check if they start with / if they do concatenate the full web link to the relative path.
      if (result.imgSrc.startsWith("/")) {
        result.imgSrc = "https://www.freecodecamp.org" + result.imgSrc;
      }
      db.Article.create(result).then(dbArticle => console.log(dbArticle)).catch(err => console.log(err));
    });      
    // after scrape take to the view articles without comments page.
    res.redirect("/");
  });
});

//Export the routes
module.exports = router;