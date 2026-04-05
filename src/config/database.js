const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dev:vxGr0zpUrwOUdJFU@devtinder.j5ydqur.mongodb.net/devTinder');
};

module.exports = connectDB;
