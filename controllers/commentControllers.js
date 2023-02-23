const {
  selectArticleComments,
  insertArticleComment,
} = require("../models/commentsModels.js");
const { selectArticleById } = require("../models/articlesModels");

exports.getArticleComments = (request, response, next) => {
  const { article_id } = request.params;
  // first check if article exists and we get the promise successfully returned

  Promise.all([
    selectArticleById(article_id),
    selectArticleComments(article_id),
  ])
    .then(([promise1Result, promise2Result]) => {
      response.status(200).send({ comments: promise2Result });
    })
    .catch(next);
};

exports.postArticleComment = (request, response, next) => {
  const { article_id } = request.params;
  const commentToInsert = request.body;

  Promise.all([
    selectArticleById(article_id),
    insertArticleComment(article_id, commentToInsert),
  ])
    .then(([promise1Result, promise2Result]) => {
      response.status(200).send({ comments: promise2Result });
    })
    .catch(next);
};