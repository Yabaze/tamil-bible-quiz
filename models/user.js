var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");

/**
 * User Schema
 */
var userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, "fullname not provided "],
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }

    },
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: [true, "Please specify user role"]
    },
    password: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAuthToken = function () {
    //get the private key from the config file -> environment variable
    return jwt.sign({_id: this._id, role: this.role, userName: this.userName}, process.env.API_SECRET, {
        expiresIn: 86400
    });
}

module.exports = mongoose.model('User', userSchema);
