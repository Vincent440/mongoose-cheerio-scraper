const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true
  }
})
const Comment = mongoose.model('Comment', CommentSchema)

module.exports = Comment
