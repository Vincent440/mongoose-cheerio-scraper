/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
//Routes to Place new Comments to articles, Delete comments from an articles.
const express = require("express");
const router = express.Router();
const db = require("../models/index.js");

// API route to populate the comment modal with all comments when a user clicks on the comment button on an article. 
router.get("/api/article/comments/:id", (req, res) => {

  db.Article.findOne({_id:req.params.id , hasComment:true})
    .then(articleToComment => {

      console.log(articleToComment);

      if(articleToComment === null){
        res.status(404).end();
      }
      else {
        res.status(200).json(articleToComment).end();
      }
    }).catch(err => res.status(404).json(err).end());
});

router.post("/api/article/create/comment/:id", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body.text);

  db.Comment.create(req.body).then(dbComment => {

    console.log(dbComment);
    // after creating the new comment, Update the article using the ID for the where claus
    // Update hasComment: true, and add the comment._id to the commentId array I have in my article Model
    //has comment is so we can only display the commented articles to commented articles page
    db.Article.findOneAndUpdate({ _id : req.params.id }, { hasComment : true , commentIds : dbComment._id }, { new: true }).then((article)=>{
      console.log(article)
      res.status(200).json(article).end();
    }).catch((err)=>{
      if (err) throw err;
    })

  }).catch(err => res.status(404).json(err).end());

});

//Export the routes
module.exports = router;