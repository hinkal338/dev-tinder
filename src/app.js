const express = require('express');
const connectDB = require('./config/database');
const User = require('./models/user');

const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User created successfully !!");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

app.get('/user', async (req, res) => {
    const userEmail = req.body.emailId;
    try {
        const users = await User.find({ emailId: userEmail });
        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch {
        res.status(400).send("Something went wrong !!");
    }
});

app.delete("/user", async (req, res) => {
    userId = req.body.id;
    try {
        const user = await User.findByIdAndDelete({ _id: userId });
        res.send("User deleted successfully")
    } catch {
        res.status(400).send("Something went wrong !!");
    }
});

app.patch("/user/:userId", async (req, res) => {
    userId = req.params?.userId;
    data = req.body;
    try {
        const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
        const isUpdateAllowed = Object.keys(data).every((k) =>
            ALLOWED_UPDATES.includes(k)
        );
        if (!isUpdateAllowed) {
            throw new Error("Update not allowed !!")
        }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, {
            runValidators: true
        });
        res.send("User updated successfully")
    } catch (err) {
        res.status(400).send("Update failed: " + err.message);
    }
});

app.get('/feed', async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            res.status(404).send("User not found");
        } else {
            res.send(users);
        }
    } catch {
        res.status(400).send("Something went wrong !!");
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