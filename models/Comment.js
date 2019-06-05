const mongoose = require("mongoose");

// Using the mongoose.Schema constructor, create a new CommentSchema object
const CommentSchema = new mongoose.Schema({
    // `articleId` is an object that stores an Article id
    // The ref property links the ObjectId to the Article model
    // This allows us to populate the Article with all of the associated Comments
    articleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Article"
    },
    text: String
});

// create our model, using mongoose's model method
const Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
