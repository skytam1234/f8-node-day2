require("module-alias/register");
const {
    getAll,
    getOne,
    create,
    replace,
    del,
} = require("@/controllers/post.controller");
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", replace);
router.delete("/:id", del);

module.exports = router;
