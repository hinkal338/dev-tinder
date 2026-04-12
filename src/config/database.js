const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dev:nnPOyJOCgvJSzVZQ@node-js.njidfxw.mongodb.net/devTinder');
};

module.exports = connectDB;
