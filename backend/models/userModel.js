const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    repositories: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        },
    ],

    followesUsers: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    starRepo: [
        {
            default: [],
            type: Schema.Types.ObjectId,
            ref: "Repository",
        },
    ],
});

const User = mongoose.model("User", UserSchema);
module.exports = User;