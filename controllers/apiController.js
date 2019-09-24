const db = require("../models/index.js");

module.exports = {
  getAllCommentsForAnArticle: (req, res) => {
    db.Article.findOne({ _id: req.params.id, comments: { $exists: true, $not: { $size: 0 } } }, "comments")
      .populate("comments")
      .then(articleToComment => {
        if (!articleToComment) {
          res.status(404).send("No Comments for this article!");
        } else {
          res.status(200).json(articleToComment);
        }
      }).catch(err => res.status(500).json(err));
  },
  createNewComment: (req, res) => {
    db.Comment.create(req.body).then(dbComment => {
      // create new comment, then take that comments ID
      // push the ID to the article comments array it is attached to. 
      db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment._id } }, { new: true }).then((article) => {
        res.status(200).json(article);
      }).catch((err) => {
        if (err) throw err;
        res.status(404).send("Error updating article with comment.");
      });
    }).catch(err => res.status(500).json(err));
  },
  deleteACommentFromArticle: (req, res) => {
    db.Comment.findByIdAndDelete(req.body)
      .then(deletedComment => {
        db.Article.findByIdAndUpdate(req.params.id, { $pull: { comments: deletedComment.id } }, { new: true }).then((article) => {
          res.status(200).json(article);
        }).catch((err) => {
          if (err) throw err;
          res.status(404).send("Error updating article with comment.");
        });
      }).catch(err => res.status(500).json(err));
  },
  deleteAllArticles: (req, res) => {
    db.Article.deleteMany({})
      .then(() => db.Comment.deleteMany({}))
      .then(() => res.status(200).send("success"))
      .catch(() => res.status(500));
  }
}
