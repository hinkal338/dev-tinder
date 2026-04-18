const express = require('express');
const connectDB = require('./config/database');
const bcrypt = require('bcrypt');
const cookieparser = require('cookie-parser');
const User = require('./models/user');
const validateSignUpData = require('./utils/validation')
const { userAuth } = require('./middlewares/auth')

const app = express();

app.use(express.json());
app.use(cookieparser());

app.post('/signup', async (req, res) => {
    try {
        // Validate user data
        validateSignUpData(req.body);

        // encrypt the user password
        const { firstName, lastNane, emailId, password } = req.body;
        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastNane,
            emailId,
            password: encryptedPassword
        });
        await user.save();
        res.send("User created successfully !!");
    } catch (err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
});

app.post('/login', async (req, res) => {
    const { emailId, password } = req.body;
    try {
        if (!emailId) {
            throw new Error("Please enter an email address");
        }
        if (!password) {
            throw new Error("Please enter a password");
        }
        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Please enter valid credentials");
        }
        const isValidPassword = await user.validatePassword(password);
        if (isValidPassword) {
            const token = await user.getJWT();
            res.cookie("token", token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) });
            res.send("Login successful");
        } else {
            throw new Error("Please enter valid credentials");
        }
    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

app.get('/profile', userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);

    } catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

app.post('/sendConnectionRequest', userAuth, (req, res) => {
    try {
        const user = req.user;
        res.send("Connection request sent successfully !!");
    } catch {
        res.status(400).send("Something went wrong");
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