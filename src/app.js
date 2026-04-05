const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.post('/signup', async (req, res) => {
    const userObj = {
        firstName: "abc",
        lastName: "d",
        emailId: "abc.d@gmail.com",
        password: "bsihaoijd",
    };
    const user = new User(userObj);

    try {
        await user.save();
        res.send("User created successfully !!");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});
connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("server is listening on port 3000 ....");
    });
}).catch((err) => {
    console.log("Database not connected");
});