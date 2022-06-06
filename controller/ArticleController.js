const req = require("express/lib/request");
const res = require("express/lib/response");
const Article = require("../models/ArticleModel");

/* 
 @route/private  /api/user/create/article
 @desc  create a blog post
*/

const createArticle = async (req, res) => {
  // get the fields from the body of the request object

  const { title, text } = req.body;

  // create an intance of a new Article

  const newArticle = new Article({
    title: title,
    text: text,
    user: req.user.user,
    author: req.user.user.username,
  });

  //   save the user

  const article = await newArticle.save();

  return res.status(200).json(article);
};

/* 
 @route/private  /api/user/update/article
 @desc  update a blog post
*/

const updateArticle = async (req, res) => {
  // article id

  let ArticleId = req.params.id;

  checkUser(ArticleId, req.user.user.id);

  // find the article and update

  await Article.findByIdAndUpdate(
    { id: ArticleId },
    { $set: req.body },
    { new: true },
    (err, data) => {
      if (err || !data) {
        return res.status(400).json("update failed on the post");
      } else {
        return res.status(200).json(data);
      }
    }
  );
};

/* 
 @route/private  /api/user/delete/article
 @desc  delete a blog post
*/
const deleteArticle = async (req, res) => {
  // article id

  let ArticleId = req.params.id;

  checkUser(ArticleId, req.user.user.id);

  // find the article and delete

  const article = await Article.findByIdAndRemove({ id: ArticleId });

  return res.status(200).json(article);
};

/* 
 @route/public  /api/user/article
 @desc  get a blog post
*/

const getArticle = async (req, res) => {
  // article id

  let ArticleId = req.params.id;

  // find the article and delete

  const article = await Article.findById(ArticleId);

  return res.status(200).json(article);
};

/* 
 @route/public  /api/user/articleS
 @desc  get aLL blog postS
*/

const getAllArticles = async (req, res) => {
  // find the article and delete

  const article = await Article.find();

  return res.status(200).json(article);
};

module.exports = {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticle,
  getAllArticles,
};

async function checkUser(ArticleId, userId, req, res, next) {
  // get article by its id
  const article = await Article.findById({ id: ArticleId });

  // check if the article userId matches with the current user

  if (!article._id.toString() === userId) {
    return res.status(400).json("you are not allowed to do that!");
  }
  next();
}
