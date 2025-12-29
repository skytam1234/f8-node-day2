require("module-alias/register");
const express = require("express");
const postsRouter = require("@/routers/posts.router");
const commentsRouter = require("@/routers/comments.router");
const router = express.Router();
router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);
module.exports = router;
