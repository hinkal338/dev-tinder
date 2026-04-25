const express = require('express');
const connectDB = require('./config/database');
const cookieparser = require('cookie-parser');


const app = express();

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(cookieparser());

app.use('/', authRouter);
app.use('/', profileRouter);
app.use('/', requestRouter);
app.use('/', userRouter);

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
        console.log("server is listening on port 3000 ....");
    });
}).catch((err) => {
    console.log("Database not connected");
});