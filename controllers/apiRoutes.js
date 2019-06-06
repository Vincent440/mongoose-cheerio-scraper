/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */


const express = require("express");
const router = express.Router();

const db = require("../models");

// add Comment to an article, Delete comment from an article.

// API route to populate the comment modal with all comments when a user clicks on the comment button on an article. 
router.get("api/article/:id", (req, res) =>{

  db.Article.find({ id:req.params.id })
    .populate("comment")
    .then( articleToComment => res.json(articleToComment))
    .catch(err => res.status(404).json(err));

});

//Export the routes
module.exports = router;