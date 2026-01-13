require("module-alias/register");
const { loadDB, setDB } = require("../../utils/jsonDB.js");
let db = {posts: []};
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
(async () => {
    db = await loadDB("posts");
})();
const postsModel = {
    getAll() {
        return db.posts || [];
    },
    getOne(id) {
        const post = db.posts.find((_post) => _post.id === id);
        return post;
    },
    create(data) {
        const newPost = {
            title: data.title,
            content: data.content,
            createdAt: data.createdAt,
            id: findIdMax("posts"),
        };
        db.posts.push(newPost);
        setDB("posts", db);
        return newPost;
    },
    replace(id, data) {
        const post = db.posts.find((_post) => _post.id === id);
        if (!post) return null;
        const { title, content } = data;
        if (!title || !content) return null;
        post.title = title;
        post.content = content;
        setDB("posts", db);
        return post;
    },
    del(id) {
        const post = db.posts.find((_post) => _post.id === id);
        const posts = db.posts.filter((_post) => _post.id !== id);
        db.posts = posts;
        setDB("posts", db);
        return post;
    },
};
module.exports = postsModel;
