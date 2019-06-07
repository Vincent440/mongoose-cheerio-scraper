const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  link: {
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: String,
    trim: true,
    required: true
  },//this will be to only display the articles which have at least one comment 
  imgSrc: {
    type: String,
    trim: true,
    required: true
  },
  comments: [{//This is to store multiple comments per article. 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;