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
const postsModel = {
    getAll() {
        return db.posts;
    },
    getOne(id) {
        const post = db.posts.find((_post) => _post.id === id);
        return post;
    },
    create(data) {
        const newPost = {
            ...data,
            id: findIdMax("posts"),
        };
        db.posts.push(newPost);
        setDB(db);
        return newPost;
    },
    replace(id, data) {
        const post = db.posts.find((_post) => _post.id === id);
        if (!post) return null;
        const { title, content, createdAt } = data;
        if (!title || !content || !createdAt) return null;
        post.title = title;
        post.content = content;
        post.createdAt = createdAt;
        setDB(db);
        return post;
    },
    edit(id, data) {
        const post = db.posts.find((_post) => _post.id === id);
        if (!post) return null;
        const { title, content, createdAt } = data;
        if (title) post.title = title;
        if (content) post.content = content;
        if (createdAt) post.createdAt = createdAt;
        setDB(db);
        return post;
    },
    del(id) {
        const post = db.posts.find((_post) => _post.id === id);
        const posts = db.posts.filter((_post) => _post.id !== id);
        db.posts = posts;
        setDB(db);
        return post;
    },
};
module.exports = postsModel;
