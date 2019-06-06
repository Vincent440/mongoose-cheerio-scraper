const mongoose = require("mongoose");

mongoose.set('useCreateIndex', true);

// Using the mongoose.Schema constructor, create a new ArticleSchema object
const ArticleSchema = new mongoose.Schema({
  // `title`  (or Headline) is required, type String
  title: {
    type: String,
    required: true,
    unique: true
  },
  // `link` is required, type String
  link: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  hasCommment:{
    type: Boolean,
    default:false
  },
  //Img source to have a small image of the article in a card, instead of a summary
  imgSrc: {
    type: String,
    required: true
  },
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
