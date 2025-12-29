require("module-alias/register");
const { loadDB, setDB } = require("../../utils/jsonDB.js");
let db = {};
function findIdMax(str) {
    if (!db[str] || db[str].length === 0) {
        return 1;
    }
    let max = db[str][0].id;
    db[str].forEach((element) => {
        if (element.id >= max) max = element.id;
    });
    return max + 1;
}
loadDB().then((respond) => (db = respond));
const commentsModel = {
    getAll() {
        return db.comments;
    },
    getOne(id) {
        const comment = db.comments.find((_comment) => _comment.id === id);
        return comment;
    },
    create(data) {
        const newComment = {
            ...data,
            id: findIdMax("comments"),
        };
        db.comments.push(newComment);
        setDB(db);
        return newComment;
    },
    replace(id, data) {
        const comment = db.comments.find((_comment) => _comment.id === id);
        if (!comment) return null;
        const { postId, content, createdAt } = data;
        if (!postId || !content || !createdAt) return null;
        comment.postId = postId;
        comment.content = content;
        comment.createdAt = createdAt;
        setDB(db);
        return comment;
    },
    edit(id, data) {
        const comment = db.comments.find((_comment) => _comment.id === id);
        if (!comment) return null;
        const { postId, content, createdAt } = data;
        if (postId) comment.postId = postId;
        if (content) comment.content = content;
        if (createdAt) comment.createdAt = createdAt;
        setDB(db);
        return comment;
    },
    del(id) {
        const comment = db.comments.find((_comment) => _comment.id === id);
        const comments = db.comments.filter((_comment) => _comment.id !== id);
        db.comments = comments;
        setDB(db);
        return comment;
    },
};
module.exports = commentsModel;
