const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  link: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  hasCommment:{//this will be to only display the articles which have at least one comment
    type: Boolean,
    default:false
  },
  imgSrc: {
    type: String,
    required: true
  },
  commentIds: [{//This is to store multiple comments per article. 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});
const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;