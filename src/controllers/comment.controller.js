require("module-alias/register");
const commentsModel = require("@/models/comment.model");
const getAll = (req, res) => {
    const comments = commentsModel.getAll();
    res.status(200).json({ data: comments });
};
const getOne = (req, res) => {
    const id = +req.params.id;
    const comment = commentsModel.getOne(id);
    if (!comment) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.status(200).json({ data: comment });
};
const create = (req, res) => {
    const data = {
        postId: req.body.postId,
        content: req.body.content,
        createdAt: req.body.createdAt,
    };
    const comment = commentsModel.create(data);
    if (!comment) {
        return res.status(422).json({
            status: 422,
            message: "Unprocessable Entity",
        });
    }
    res.status(201).json({
        data: comment,
    });
};
const replace = (req, res) => {
    const id = +req.params.id;
    const data = {
        postId: req.body.postId,
        content: req.body.content,
        createdAt: req.body.createdAt,
    };
    const comment = commentsModel.replace(id, data);
    if (!comment) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.json({
        data: comment,
    });
};
const edit = (req, res) => {
    const id = +req.params.id;
    const data = {
        postId: req.body.postId,
        content: req.body.content,
        createdAt: req.body.createdAt,
    };
    const comment = commentsModel.edit(id, data);
    if (!comment) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.json({
        data: comment,
    });
};
const del = (req, res) => {
    const id = +req.params.id;
    const comment = commentsModel.del(id);
    if (!comment) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.status(204).json({
        data: comment,
    });
};
module.exports = { getAll, getOne, create, replace, edit, del };
