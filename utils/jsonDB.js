require("module-alias/register");
const { readFile, writeFile, mkdir } = require("node:fs/promises");
const path = require("node:path");

const setDB = async (resourceName, data) => {
    const DB_FILE = path.join(__dirname, `../src/db/${resourceName}.json`);
    try {
        await mkdir(path.dirname(DB_FILE), { recursive: true });
        await writeFile(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
    } catch (error) {
        console.error(`Lỗi khi ghi file ${resourceName}:`, error);
    }
};

const loadDB = async (resourceName) => {
    const DB_FILE = path.join(__dirname, `../src/db/${resourceName}.json`);
    try {
        const result = await readFile(DB_FILE, "utf-8");
        return JSON.parse(result);
    } catch (error) {
        if (error.code === "ENOENT") {
            await mkdir(path.dirname(DB_FILE), { recursive: true });
            await setDB(resourceName, { [resourceName]: [] });
            return { [resourceName]: [] };
        }
        return { [resourceName]: [] };
    }
};

module.exports = { loadDB, setDB };
