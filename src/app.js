const express = require('express');
const { authAdmin, authUser } = require('./middlewares/auth.js');

const app = express();

// // this will match all the HTTP method APIs
// app.use("/", (req, res) => {
//     res.send("Welcome to dev-tinder !!");
// })


// Middleware for authentication
app.use("/admin", authAdmin);

app.get("/admin/getData", (req, res) => {
    res.send("Retrieved all data");
});

app.delete("/admin/deleteData", (req, res) => {
    res.send("Deleted data");
});

app.get("/user/login", (req, res) => {
    res.send("Logged in successfully");
});

app.use("/user", authUser, (req, res) => {
    res.send("Retrieved user data");
});

app.listen(3000, () => {
    console.log("server is listening on port 3000 ....");
});