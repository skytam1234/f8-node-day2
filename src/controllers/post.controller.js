require("module-alias/register");
const postsModel = require("@/models/posts.model");
const getAll = (req, res) => {
    const posts = postsModel.getAll();
    res.status(200).json({ data: posts });
};
const getOne = (req, res) => {
    const id = +req.params.id;
    const post = postsModel.getOne(id);
    if (!post) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.status(200).json({ data: post });
};
const create = (req, res) => {
    const data = {
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
    };
    const post = postsModel.create(data);
    if (!post) {
        return res.status(422).json({
            status: 422,
            message: "Unprocessable Entity",
        });
    }
    res.status(201).json({
        data: post,
    });
};
const replace = (req, res) => {
    const id = +req.params.id;
    const data = {
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
    };
    const post = postsModel.replace(id, data);
    if (!post) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.json({
        data: post,
    });
};
const edit = (req, res) => {
    const id = +req.params.id;
    const data = {
        title: req.body.title,
        content: req.body.content,
        createdAt: req.body.createdAt,
    };
    const post = postsModel.edit(id, data);
    if (!post) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.json({
        data: post,
    });
};
const del = (req, res) => {
    const id = +req.params.id;
    const post = postsModel.del(id);
    if (!post) {
        return res.status(404).json({
            status: 404,
            message: "404 Not Found",
        });
    }
    res.status(204).json({
        data: post,
    });
};
module.exports = { getAll, getOne, create, replace, edit, del };
