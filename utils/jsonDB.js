require("module-alias/register");
const { readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");
const DB_FILE = path.join(__dirname, "../src/db/db.json");
const loadDB = async () => {
    try {
        const result = await readFile(DB_FILE, "utf-8");
        return JSON.parse(result);
    } catch (error) {
        if (error.code === "ENOENT") {
            await setDB({});
        }
        return {};
    }
};

const setDB = async (data) => {
    await writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
};
module.exports = { loadDB, setDB };
