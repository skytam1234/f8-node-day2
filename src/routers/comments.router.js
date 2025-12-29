require("module-alias/register");
const {
    getAll,
    getOne,
    create,
    replace,
    edit,
    del,
} = require("@/controllers/comments.controller");
const express = require("express");
const router = express.Router();
router.get("/", getAll);
router.get("/:id", getOne);
router.post("/", create);
router.put("/:id", replace);
router.patch("/:id", edit);
router.delete("/:id", del);

module.exports = router;
