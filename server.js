require("module-alias/register");
const express = require("express");
var cors = require("cors");
const appRoute = require("@/routes");
const app = express();
const port = 3000;
const allowedOrigins = [
    "http://localhost:5173",
    "https://skytam1234.github.io:443",
];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        optionsSuccessStatus: 200,
    })
);
app.use(express.json());
app.use("/api", appRoute);
app.listen(port, () => {
    console.log("Running on localhost:" + port);
});
