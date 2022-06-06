const express = require("express");

const router = express.Router();

/*
 createArticle,
  updateArticle,
  deleteArticle,
  getArticle,
  getAllArticles
*/

const {
  createArticle,
  updateArticle,
  deleteArticle,
  getAllArticles,
  getArticle,
} = require("../controller/ArticleController");
const { verifyTokenAndAuthorization } = require("../middlewares/verifyToken");

router.route("/user/create").post(verifyTokenAndAuthorization, createArticle);
router
  .route("/user/update/:id")
  .post(verifyTokenAndAuthorization, updateArticle);
router
  .route("/user/delete/:id")
  .post(verifyTokenAndAuthorization, deleteArticle);

router.route("/user/article/:id").post(getArticle);

router.route("/user/articles/:id").post(getAllArticles);

module.exports = router;
