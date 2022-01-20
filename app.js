const express = require("express");
const app = express();
const path = require("path");
app.use(
    express.static("build")
);

app.listen(3000, function () {
    console.log("Listening on port 3000!");
});

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/myHousehold", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/profile/:profileId", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/households/:householdId", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/favorites", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/siteMap", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
