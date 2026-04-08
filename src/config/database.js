const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dev:BYlGaCNZrzd3ae7B@node-js.qwc76rp.mongodb.net/devTinder');
};

module.exports = connectDB;
