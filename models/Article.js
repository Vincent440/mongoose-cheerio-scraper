const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new ArticleSchema object
const ArticleSchema = new Schema({
  // `title`  (or Headline) is required, type String
  title: {
    type: String,
    required: true
  },
  // `link` is required, type String
  link: {
    type: String,
    required: true
  },
  //Img source to have a small image of the article in a card, instead of a summary
  imgSrc: {
    type: String,
    required: true
  },
  // `comment` is an object that stores a Comment id
  // The ref property links the ObjectId to the Comment model
  // This allows us to populate the Article with an associated Comment
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// This creates our model from the above schema, using mongoose's model method
const Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
