const handlebarsController = require("../controllers/handlebarsController.js");
const apiController = require("../controllers/apiController.js");
const express = require("express");
const router = express.Router();

router.get("/", handlebarsController.findAllArticles);

router.get("/commented", handlebarsController.getCommentedArticles);

router.get("/scrape", handlebarsController.scrapeFreeCodeCampe);

router.get("/api/article/get/all/comments/:id",apiController.getAllCommentsForAnArticle );

router.post("/api/article/create/comment/:id", apiController.createNewComment);

router.delete("/api/article/delete/comment/:id", apiController.deleteACommentFromArticle);

router.delete("/api/article/delete/all", apiController.deleteAllArticles);

module.exports = router;
