/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Routes to Place new Comments to articles, Delete comments from an articles.
const express = require("express");
const router = express.Router();
const db = require("../models/index.js");

// API route to populate the comment modal with all comments when a user clicks on the comment button on an article. 
router.get("/api/article/get/all/comments/:id", (req, res) => {

  db.Article.findOne({_id:req.params.id, comments: { $exists: true , $not: { $size:0 }}},"comments")
    .populate("comments")
    .then(articleToComment => {
      if(!articleToComment){
        res.status(404).send("No Comments for this article!");
      }
      else {
        res.status(200).json(articleToComment);
      }
    }).catch(err => res.status(500).json(err));
});

router.post("/api/article/create/comment/:id", (req, res) => {

  db.Comment.create(req.body).then(dbComment => {
    // create new comment, then take that comments ID
    // push the ID to the article comments array it is attached to. 
    db.Article.findOneAndUpdate({ _id : req.params.id }, { $push: { comments : dbComment._id }}, { new: true }).then((article)=>{
      res.status(200).json(article);
    }).catch((err)=>{
      if (err) throw err;
      res.status(404).send("Error updating article with comment.");
    });

  }).catch(err => res.status(500).json(err));
});

router.delete("/api/article/delete/comment/:id", (req, res) => {
  db.Comment.findByIdAndDelete(req.body)
  .then(deletedComment => {
    db.Article.findByIdAndUpdate(req.params.id, { $pull: { comments : deletedComment.id }}, { new: true }).then((article)=>{
      res.status(200).json(article);
    }).catch((err)=>{
      if (err) throw err;
      res.status(404).send("Error updating article with comment.");
    });

  }).catch(err => res.status(500).json(err));

});

// Delete everything route
router.delete("/api/article/delete/all", (req, res) => {
  db.Article.deleteMany({})
      .then(() => db.Comment.deleteMany({}))
      .then(() => res.status(200).send("success"))
      .catch(() => res.status(500));
});

//Export the routes
module.exports = router;