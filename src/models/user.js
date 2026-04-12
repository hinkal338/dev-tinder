const mongoose = require('mongoose');
const validator = require('validator');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address: " + value);
            }
        },
    },
    password: {
        type: String,
        required: true, 
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Please enter a strong password: " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        validate: {
            validator: (value) => {
                if (!["male", "female", "others"].includes(value))
                    throw new Error("Gender is not allowed: " + value);
            }
        }
    },
    about: {
        type: String,
        default: "This is the default about you."
    },
    skills: {
        type: [String],
        validate: {
            validator: (value) => {
                if (value.length > 10)
                    throw new Error("Only 10 skills are allowed " + value);
            }
        }
    },
    photoURL: {
        type: String,
        validate(value) {
            if (!validator.isURL(value))
                throw new Error("Invalid photo url: " + value);
        }
    }
}, {
    timestamps: true
});
const User = mongoose.model('User', userSchema);

module.exports = User;