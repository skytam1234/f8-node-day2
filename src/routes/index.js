require("module-alias/register");
const express = require("express");
const postsRouter = require("@/routes/posts.route");
const commentsRouter = require("@/routes/comments.route");
const router = express.Router();
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
module.exports = router;
