/* eslint-disable no-console */
/* eslint-disable no-undef */
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models/index.js");
module.exports = {
  findAllArticles:(req, res) => {
    db.Article.find({})
      .populate("comments")
      .then(articles => {
        res.render("index", { articles })
      }).catch((err) => {
        res.status(500).json(err);
      });
  },
  getCommentedArticles:(req, res) => {
    db.Article.find({ comments: { $exists: true, $not: { $size: 0 } } })
      .populate("comments")
      .then(commentedArticle => {
        res.render("commented-articles", { commentedArticle })
      }).catch(err => res.status(500).json(err));
  },
  scrapeFreeCodeCampe: (req, res) => {
    axios.get("https://www.freecodecamp.org/news/").then(response => {
      const $ = cheerio.load(response.data);
      $("div.post-feed article.post-card").each((i, element) => {
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
        db.Article.create(result).then(articleDoc => console.log(articleDoc)).catch(err => console.log(err));
      });
      // after scrape take to the view articles without comments page.
      res.redirect("/");
    });
  }
}
